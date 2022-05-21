### How it works
1. Client library script is loaded
   1. https://developers.google.com/identity/gsi/web/guides/client-library
2. Once the library is loaded, the specified callback is invoked
3. This callback will trigger a custom event
4. This component listens for the custom event, and once received, will call the relevant `onSignIn` method
   1. This method is declared in the service and called from the Component
   2. This is because the component can listen to window events, but the service cannot



#### Customizing the Sign in Button
https://developers.google.com/identity/gsi/web/tools/configurator


### Setup
* https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
* https://console.cloud.google.com/apis
* https://console.cloud.google.com/cloud-resource-manager?organizationId=0
*


### TODO:
read this: https://support.google.com/cloud/answer/10311615#user-type&zippy=%2Cinternal%2Ctesting
