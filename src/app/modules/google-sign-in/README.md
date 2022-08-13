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

### TODO:
* read this: https://support.google.com/cloud/answer/10311615#user-type&zippy=%2Cinternal%2Ctesting
* Config should be optional and error message should be provided if no config is provided


### Build Stats
stats pulled from output of `npm run build`

Commit Hash: 1e68f41025ef680eb9cd9f969c75fb611e907cf6
Initial Chunk Files           | Names         |  Raw Size | Estimated Transfer Size
main.3698ffb1a31b1ab5.js      | main          | 173.67 kB |                47.25 kB
polyfills.8bdd3067fc7fff84.js | polyfills     |  33.03 kB |                10.59 kB
runtime.702ef0128380cd27.js   | runtime       |   1.05 kB |               599 bytes
styles.578aa5c03ae9deb3.css   | styles        |  25 bytes |                22 bytes

                              | Initial Total | 207.78 kB |                58.45 kB

Build at: 2022-05-23T11:43:35.645Z - Hash: 234bb59ec2ba8c94 - Time: 5482ms

---

#### Build Stats Notes
1. With or Without GoogleSignInSettings, build size is unchanged
2. Moving functionality to a service increases build size from 173.70kb -> 175.74kb
