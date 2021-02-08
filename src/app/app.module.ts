import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { DetailsReducer } from './reducer/details.reducer';
import { EffectsModule } from '@ngrx/effects';
import {DetailsEffect } from './effect/details.effect'
import { HttpClientModule } from '@angular/common/http';
import { DetailsService } from './service/details.service';
import { DetailsListComponent } from './components/getComponent/get.component';

import { MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    // AppComponent
    DetailsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({'details':DetailsReducer}),
    EffectsModule.forRoot([DetailsEffect]),
    HttpClientModule,
    MatTableModule
  ],
  providers: [DetailsService],
  bootstrap: [DetailsListComponent]
})
export class AppModule { }
