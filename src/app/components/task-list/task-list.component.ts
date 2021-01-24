import { Observable } from 'rxjs';
import { HttpService } from '../../../services/http.service';

import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasklist: Observable<Task[]>;

  constructor(private http: HttpService, private cookieSer: CookieService) {
    this.tasklist = this.http.getTaskListObs();
  }

  ngOnInit(): void {
    this.http.inital();
    this.tasklist = this.http.getTaskListObs();
  }

  remove(task: Task) {
    this.http.delete(task);
  }
  done(task: Task) {
    this.http.done(task);
    //this.taskSer.sortTasks();
  }

  clear() {
    this.http.clear();
    this.http.deleteAll().subscribe((task) => {});
  }
}
