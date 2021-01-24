import { MyInterceptor } from './interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LogoComponent } from './components/logo/logo.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FooterComponent } from './components/footer/footer.component';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { CheckedDirective } from './shared/checked.directive';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ModalComponent } from './components/modal/modal.component';
registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    AddNewTaskComponent,
    TaskListComponent,
    FooterComponent,
    CheckedDirective,
    LoginComponent,
    DashbordComponent,
    ModalComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
