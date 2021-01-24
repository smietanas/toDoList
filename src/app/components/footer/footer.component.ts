import { HttpService } from '../../../services/http.service';
import { Component } from '@angular/core';
import { respModel } from '../../models/respModel';
import { Statuses } from '../../models/enums';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private http: HttpService, private router: Router) {}

  logOut() {
    this.http.logOut().subscribe((res) => {
      const responseMod: respModel = res.body;
      if (responseMod.code === Statuses.OK) {
        console.log('logout');
        this.router.navigate(['/login']);
      }
    });
  }
}
