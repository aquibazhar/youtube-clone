import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://dev-kc6a6jvbav2d0ut6.us.auth0.com',
        redirectUrl: window.location.origin,
        clientId: '26o7SXDZ1xbXsphk0U4tNjh03CtoXF05',
        scope: 'openid profile offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
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
