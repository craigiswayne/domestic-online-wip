import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSignInComponent } from './google-sign-in.component';
import { GoogleSignInSettings } from './google-sign-in.settings';
import { GoogleSignInService } from './google-sign-in.service';

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

  /**
   * @link https://angular.io/guide/singleton-services
   * @param parentModule
   */
  constructor(@Optional() @SkipSelf() parentModule?: GoogleSignInModule) {
    if (parentModule) {
      throw new Error(
        'GoogleSignInModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: GoogleSignInSettings): ModuleWithProviders<GoogleSignInModule> {
    return {
      ngModule: GoogleSignInModule,
      providers: [ GoogleSignInService, { provide: 'config', useValue: config} ]
    }
  }
}
