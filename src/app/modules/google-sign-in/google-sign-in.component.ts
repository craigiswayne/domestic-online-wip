import { Component, HostListener, Inject } from '@angular/core';
import { GoogleSignInResponse } from './google-sign-in-response.interface';
import { GoogleSignInSettings } from './google-sign-in.settings';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

/**
 * This is done so that the 'onGoogleSignIn' method can be added to the window object
 * @see Document.defaultView
 */
type CustomGoogleWindow = WindowProxy & typeof globalThis & {onGoogleSignIn?: (resp: GoogleSignInResponse) => void};

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html'
})
export class GoogleSignInComponent {

  public readonly callbackMethodName = GoogleSignInSettings.CallbackMethodName;
  public readonly clientID = GoogleSignInSettings.ClientID;
  public readonly credentials$ = new Subject<GoogleSignInResponse>();

  private readonly customEventName = GoogleSignInSettings.CustomEventName;
  private readonly window: CustomGoogleWindow | null;

  @HostListener('window:onGoogleSignInEvent', ['$event'])
  onGoogleSignInEvent(resp: CustomEvent<GoogleSignInResponse>) {
    this.credentials$.next(resp.detail);
  }

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.window = this.document.defaultView;
    this.addClientLibraryCallback$().then(() => {
      this.injectClientLibraryScript$();
    });

  }

  private async addClientLibraryCallback$(): Promise<void> {
    return new Promise((resolve, reject) => {
      if(this.window === null){
        return reject();
      }

      this.window.onGoogleSignIn = (resp: GoogleSignInResponse): void => {
        if (this.window === null) {
          return;
        }
        this.window.dispatchEvent(new CustomEvent(this.customEventName, {detail: resp}));
      }

      return resolve();
    })

  }

  private async injectClientLibraryScript$(): Promise<void> {

    if(this.document.head.querySelector(`#${GoogleSignInSettings.ClientLibraryScripTagID}`) !== null){
      return;
    }

    const scriptTag = this.document.createElement('script');
    scriptTag.id = GoogleSignInSettings.ClientLibraryScripTagID;
    scriptTag.src = GoogleSignInSettings.ClientLibraryScriptSrc;
    this.document.head.appendChild(scriptTag);
  }

}
