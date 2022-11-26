import Keycloak from "keycloak-js";
import KeycloakAuthorization from "keycloak-js/dist/keycloak-authz";


export class KeycloakService {
  private readonly keycloak: Keycloak;
  private readonly keycloakAuthorization: KeycloakAuthorization;
  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'keycloak-god',
      clientId: 'angular-god'
    });
    this.keycloak.init({
      flow: 'implicit',
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    }).then(function(authenticated) {
      console.log(authenticated)
    }).catch(function(e) {
      console.log(e)
      alert('failed to initialize');
    });
    this.keycloak.onTokenExpired = ()=>{
      this.keycloak.updateToken(30).then((refreshed)=>{
        if (refreshed){
          console.log('refreshed '+new Date());
        }else {
          console.log('not refreshed '+new Date());
        }
      }).catch(() => {
        console.error('Failed to refresh token '+new Date());
      });
    }

    this.keycloakAuthorization = new KeycloakAuthorization(this.keycloak);
  }

  public getKeycloakInstance() {
    return this.keycloak;
  }

  public getKeycloakAuthorizationInstance() {
    return this.keycloakAuthorization;
  }
}
