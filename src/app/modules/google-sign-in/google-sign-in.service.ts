import { Inject, Injectable } from '@angular/core';
import { GoogleSignInSettings } from './google-sign-in.settings';

@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {

  public clientID: string | null = this.config.clientID;

  /**
   * @link https://angular.io/guide/singleton-services
   */
  constructor(@Inject('config') private config: GoogleSignInSettings) {
  }
}
