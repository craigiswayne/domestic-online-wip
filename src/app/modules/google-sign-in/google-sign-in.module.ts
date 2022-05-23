import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSignInComponent } from './google-sign-in.component';

@NgModule({
  declarations: [
    GoogleSignInComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GoogleSignInComponent
  ]
})
export class GoogleSignInModule {
}
