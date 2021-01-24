import { HttpService } from '../../../services/http.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css'],
})
export class AddNewTaskComponent {
  isAdd = false;
  taskName: string = '';
  taskDeadline: Date = null;
  dateA = new Date();
  dateMin =
    this.dateA.getFullYear() +
    '-' +
    ('0' + (this.dateA.getMonth() + 1)).slice(-2) +
    '-' +
    this.dateA.getDate();
  constructor(private http: HttpService) {}

  add() {
    const newTask = {
      name: this.taskName,
      done: false,
      deadline: this.taskDeadline,
      createDate: new Date().toLocaleDateString(),
    };
    this.http.add(newTask);
    this.taskName = '';
    this.taskDeadline = null;
  }

  switchEditMode() {
    this.isAdd = !this.isAdd;
    this.taskName = '';
    this.taskDeadline = null;
  }
}
