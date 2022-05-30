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
    GoogleSignInModule.forRoot({clientID: '953189047584-7e9u388fcbc1l130fbkid908vbm9h2b5.apps.googleusercontent.com'})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
