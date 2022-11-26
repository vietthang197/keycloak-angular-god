import { Component } from '@angular/core';
import {KeycloakService} from "./service/keycloak.service";
import Keycloak from "keycloak-js";
import KeycloakAuthorization from "keycloak-js/dist/keycloak-authz";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keycloak-angular-god';
  private keycloak: Keycloak;
  private keycloakAuthorization: KeycloakAuthorization;

  constructor(private appService: KeycloakService) {
    this.keycloak = this.appService.getKeycloakInstance();
    this.keycloakAuthorization = this.appService.getKeycloakAuthorizationInstance();
  }

 doLogin() {
    this.keycloak.login().then(value => {
      console.log("result login: ", value)
    }).catch(function (e) {
      console.log(e)
    })
   this.keycloak.login()
 }

 getUserInfo() {
    console.log('============> Token: ', this.keycloak.token)
   this.keycloak.loadUserInfo().then(value => {
    console.log(value)
   })
 }

 showRpt() {
   let authorizationRequest = {
     "ticket": "2324ututy"
   };
   this.keycloakAuthorization.authorize(authorizationRequest).then(rpt => {
     console.log(rpt)
   }, () => {
     console.log('deny')
   }, () => {
     console.log('error')
   })
 }
}
