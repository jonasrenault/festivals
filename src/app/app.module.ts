import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CustomMaterialModule } from './custom-material/custom-material.module';

import { AppComponent } from './app.component';

import { FestivalService } from './festival.service';
import { MapService } from './map.service';
import { FestivalsComponent } from './festivals/festivals.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    FestivalsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    FestivalService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
