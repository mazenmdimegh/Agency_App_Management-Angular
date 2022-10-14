import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { LouerComponent } from './louer/louer.component';
import { FormEntrepreneurComponent } from './signup/form-entrepreneur/form-entrepreneur.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { OffreManagerComponent } from './back-office/offre-manager/offre-manager.component';
import { UserManagerComponent } from './back-office/user-manager/user-manager.component';
import { AcheterComponent } from './acheter/acheter.component';
import { historyComponent } from './back-office/history/history.component';
import { historiqueComponent } from './history/historique.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'user-profile', component: ProfileComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'formE', component: FormEntrepreneurComponent },
    { path: 'register', component: SignupComponent },
    { path: 'landing', component: LandingComponent },
    
    {
        path: 'backOffice', component: BackOfficeComponent,
        children: [
            { path: 'Offres', component: OffreManagerComponent, },
            { path: 'users', component: UserManagerComponent, },
            { path: 'demandes', component: historyComponent, }
        ]
    },

    { path: 'history', component: historiqueComponent },
    { path: 'login', component: LoginComponent },
    { path: 'louer', component: LouerComponent },
    { path: 'acheter', component: AcheterComponent },


    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
export const routingComponents = [
]