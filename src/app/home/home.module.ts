import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { ContentComponent } from './content/content.component';
import { MapComponent } from './map/map.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule
    ],
    declarations: [ HomeComponent, ContentComponent, MapComponent ],
    exports:[ HomeComponent ],
    providers: []
})
export class HomeModule { }
