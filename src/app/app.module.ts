import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { MapComponent } from './map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AngularMaterialModule } from './angular-material.module';
import { ErrorInterceptor } from './error.interceptor';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    ErrorComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gMapsApiKey,
    }),
    AgmSnazzyInfoWindowModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule { }
