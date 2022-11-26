import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {KeycloakService} from "./service/keycloak.service";
import {AppRoutingModule} from "./app-routing.module";

function initializeKeycloak(appservice: KeycloakService) {
  return () => {};
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
