import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
//import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { LouerComponent } from './louer/louer.component';
import { FormEntrepreneurComponent } from './signup/form-entrepreneur/form-entrepreneur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackOfficeComponent } from './back-office/back-office.component';
import { OffreManagerComponent } from './back-office/offre-manager/offre-manager.component';
import { UserManagerComponent } from './back-office/user-manager/user-manager.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AcheterComponent } from './acheter/acheter.component';
import { historyComponent } from './back-office/history/history.component';
import { historiqueComponent } from './history/historique.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    AcheterComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    LouerComponent,
    FormEntrepreneurComponent,
    BackOfficeComponent,
    OffreManagerComponent,
    UserManagerComponent,
    historyComponent,
    historiqueComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    CommonModule, 
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
