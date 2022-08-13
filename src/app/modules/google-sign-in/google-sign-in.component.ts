import { Component, HostListener, Inject } from '@angular/core';
import { GoogleCredentialResponse } from './google-sign-in-response.interface';
import { GoogleSignInDefaults } from './google-sign-in.settings';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { GoogleSignInService } from './google-sign-in.service';

interface DecodedCredential {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

/**
 * This is done so that the 'onGoogleSignIn' method can be added to the window object
 * @see Document.defaultView
 */
type CustomGoogleWindow = WindowProxy & typeof globalThis & {onGoogleSignIn?: (resp: GoogleCredentialResponse) => void};

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html'
})
export class GoogleSignInComponent {

  public readonly enablePersonalizedSignInButton = false;
  public readonly callbackMethodName = GoogleSignInDefaults.CallbackMethodName;
  public readonly clientID = this.service.clientID;
  public readonly credentialResponse$ = new Subject<GoogleCredentialResponse>();
  public decodedToken$ = new Subject<DecodedCredential>();

  private readonly customEventName = GoogleSignInDefaults.CustomEventName;
  private readonly window: CustomGoogleWindow | null;

  @HostListener('window:onGoogleSignInEvent', ['$event'])
  onGoogleSignInEvent(resp: CustomEvent<GoogleCredentialResponse>) {
    this.credentialResponse$.next(resp.detail);
    this.decodeToken(resp.detail.credential);
  }

  constructor(
    private readonly service: GoogleSignInService,
    @Inject(DOCUMENT) private readonly document: Document) {
    this.window = this.document.defaultView;

    if(!this.window){
      return;
    }
    // TODO: better error checking for null window
    this.addClientLibraryCallback$().then(() => {
      this.injectClientLibraryScript$();
    });

  }

  private async addClientLibraryCallback$(): Promise<void> {
    return new Promise((resolve, reject) => {
      if(this.window === null){
        return reject();
      }

      this.window.onGoogleSignIn = (resp: GoogleCredentialResponse): void => {
        if (this.window === null) {
          return;
        }
        this.window.dispatchEvent(new CustomEvent(this.customEventName, {detail: resp}));
      }

      return resolve();
    })

  }

  private async injectClientLibraryScript$(): Promise<void> {

    if(this.document.head.querySelector(`#${GoogleSignInDefaults.ClientLibraryScripTagID}`) !== null){
      return;
    }

    const scriptTag = this.document.createElement('script');
    scriptTag.id = GoogleSignInDefaults.ClientLibraryScripTagID;
    scriptTag.src = GoogleSignInDefaults.ClientLibraryScriptSrc;
    this.document.head.appendChild(scriptTag);
  }

  private decodeToken(token: string): void {
    const result = JSON.parse(atob(token.split('.')[1]))
    this.decodedToken$.next(result);
  }

}
