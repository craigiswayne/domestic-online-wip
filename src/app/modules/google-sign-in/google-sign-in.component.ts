import { Component, HostListener, Inject } from '@angular/core';
import { GoogleSignInResponse } from './google-sign-in-response.interface';
import { GoogleSignInSettings } from './google-sign-in.settings';
import { BehaviorSubject, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html'
})
export class GoogleSignInComponent {

  public callbackMethodName = 'onGoogleSignIn';
  public clientID = GoogleSignInSettings.ClientID;
  public readonly credentials$ = new Subject<GoogleSignInResponse>()
  public readonly isAuthenticated$ = new BehaviorSubject(false);

  private readonly window: (WindowProxy & typeof globalThis) | null;
  private readonly customEventName = 'onGoogleSignInEvent'

  @HostListener('window:onGoogleSignInEvent', ['$event'])
  onGoogleSignInEvent(resp: CustomEvent<GoogleSignInResponse>) {
    this.credentials$.next(resp.detail);
    this.isAuthenticated$.next(true);
  }

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.window = this.document.defaultView;
    this.addClientLibraryCallback$();
    this.injectClientLibraryScript$();
  }

  private async addClientLibraryCallback$(): Promise<void> {
    // @ts-ignore
    this.window['onGoogleSignIn'] = (resp: GoogleSignInResponse): void => {
      if (this.window === null) {
        return;
      }
      this.window.dispatchEvent(new CustomEvent(this.customEventName, {detail: resp}));
    }
  }

  private async injectClientLibraryScript$(): Promise<void> {
    const id = 'googleSignIn';

    if(this.document.head.querySelector(`#${id}`) !== null){
      return;
    }

    const scriptTag = this.document.createElement('script');
    scriptTag.id = id;
    scriptTag.src = GoogleSignInSettings.ClientLibraryScriptSrc;
    scriptTag.async = true;
    scriptTag.defer = true;
    this.document.head.appendChild(scriptTag);
  }

}
