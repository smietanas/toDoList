import { respModel } from './../app/models/respModel';
import { LogModel } from './../app/models/login';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from '../app/models/Task';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
    this.getTasks();
  }

  inital() {
    this.getTasks().subscribe((tasks) => {
      this.taskListObs.next(tasks);
    });
  }
  url = 'http://server419909.nazwa.pl:8001/api/tasks/';
  url2 = 'http://server419909.nazwa.pl:8001/api/task/';

  // url = 'http://localhost:8001/api/tasks/';
  // url2 = 'http://localhost:8001/api/task/';

  taskListObs = new BehaviorSubject<Task[]>([]);

  getTaskListObs(): Observable<Task[]> {
    return this.taskListObs.asObservable();
  }

  clear() {
    this.taskListObs.next([]);
  }

  tryToLogin(log: LogModel): Observable<HttpResponse<respModel>> {
    return this.http.post<respModel>(this.url + 'login', log, {
      observe: 'response',
      withCredentials: true,
    });
  }
  logOut(): Observable<HttpResponse<respModel>> {
    return this.http.post<respModel>(this.url + 'logout', null, {
      observe: 'response',
      withCredentials: true,
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url, {
      withCredentials: true,
    });
  }

  add(task: Task) {
    this.http
      .post<Task>(this.url, task, { withCredentials: true })
      .subscribe((task) => {
        const list = this.taskListObs.getValue();
        list.push(task);
        this.taskListObs.next(list);
      });
  }

  done(task: Task) {
    task.done = true;
    task.executeDate = new Date();
    this.http
      .put<Task>(this.url2 + task._id, task, { withCredentials: true })
      .subscribe((task) => {
        const list = this.taskListObs.getValue();
        this.taskListObs.next(list);
      });
  }

  delete(task: Task) {
    this.http
      .delete<Task>(this.url2 + task._id, { withCredentials: true })
      .subscribe((responseTask) => {
        const list = this.taskListObs.getValue().filter((e) => e !== task);
        this.taskListObs.next(list);
      });
  }

  deleteAll(): Observable<Task[]> {
    return this.http.delete<Task[]>(this.url, { withCredentials: true });
  }
}
