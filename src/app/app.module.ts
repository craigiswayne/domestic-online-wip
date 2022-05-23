import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleSignInModule } from './modules/google-sign-in/google-sign-in.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    GoogleSignInModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
