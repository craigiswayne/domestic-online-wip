import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSignInComponent } from './google-sign-in.component';

@NgModule({
  declarations: [
    GoogleSignInComponent
  ],
  exports: [
    GoogleSignInComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GoogleSignInModule {
}
