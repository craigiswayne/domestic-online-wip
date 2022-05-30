export const GoogleSignInDefaults = {
  ClientLibraryScriptSrc: 'https://accounts.google.com/gsi/client',
  ClientLibraryScripTagID: 'googleSignIn',
  /**
   * This is the method that is invoked after the sign in succeeds
   */
  CallbackMethodName: 'onGoogleSignIn',
  /**
   * Triggered when the callback is invoked
   */
  CustomEventName: 'onGoogleSignInEvent'
}

export interface GoogleSignInSettings {
  clientID: string;
}
