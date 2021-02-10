import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { DetailsReducer } from './reducer/detail.reducer';
import { EffectsModule } from '@ngrx/effects';
import {DetailsEffect } from './effect/details.effect'
import { HttpClientModule } from '@angular/common/http';
import { DetailsService } from './service/details.service';
import { DetailsListComponent } from './components/getComponent/get.component';

import { MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DetailsAddComponent } from './components/postComponent/post.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './components/deleteComponent/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsListComponent,
    DetailsAddComponent
  ],
  imports: [
    RouterModule.forRoot([
      {path : 'getdetails' , component : DetailsListComponent},
      {path : 'postDetails' , component : DetailsAddComponent}
    ]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({'details':DetailsReducer}),
    EffectsModule.forRoot([DetailsEffect]),
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule
    ],
  providers: [DetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
