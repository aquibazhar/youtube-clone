import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://dev-kc6a6jvbav2d0ut6.us.auth0.com',
        redirectUrl: window.location.origin,
        clientId: '26o7SXDZ1xbXsphk0U4tNjh03CtoXF05',
        scope: 'openid profile offline_access email',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        // Http Interceptor: It'll intercept all the http requests made to spring boot and automatically add the token to the http request.
        secureRoutes: ['http://localhost:8080'],
        customParamsAuthRequest: {
          audience: 'http://localhost:8080',
        },
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
