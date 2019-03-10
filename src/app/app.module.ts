import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';

@NgModule({
   declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDK51O5ilaoe3wHk53UkpeSbkw5srJ2jj8'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
