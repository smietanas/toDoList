import { LogModel } from '../../models/login';
import { HttpService } from '../../../services/http.service';
import { Component } from '@angular/core';
import { respModel } from '../../models/respModel';
import { Statuses } from '../../models/enums';

import { Router } from '@angular/router';
import * as M from 'materialize-css/dist/js/materialize';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private http: HttpService, private router: Router) {}

  login: string = '';
  password: string = '';

  logger() {
    console.log('start login');
    const newLog: LogModel = {
      email: this.login,
      password: this.password,
    };
    this.http.tryToLogin(newLog).subscribe(
      (res) => {
        console.log('res');

        const responseMod: respModel = res.body;

        if (responseMod.code === Statuses.OK) {
          this.router.navigate(['']);
        } else {
          M.toast({ html: 'Coś poszło nie tak', classes: 'rounded' });
        }
      },
      (err) => {
        if (err.status === Statuses.AuthenticationError)
          M.toast({ html: 'Sesja wygasła', classes: 'rounded' });
        if (err.status === Statuses.UnknownError)
          M.toast({
            html: 'Wystąpił błąd. Sprawdź połączenie z internetem',
            classes: 'rounded',
          });
        if (err.status === Statuses.ResourcesNotFound) {
          M.toast({
            html: 'Nie znaleziono użytkownika. Sprawdź dane logowania',
            classes: 'rounded',
          });
        }
      }
    );
  }
}
