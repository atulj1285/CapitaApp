import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule, MatSelectModule} from '@angular/material';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopupModelComponent } from './popup-model/popup-model.component';

const appRoutes:Routes=[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PopupModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
   
    MatTableModule,
    MatSelectModule,
    
    ModalModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot()
  
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ PopupModelComponent ]
})
export class AppModule { }
