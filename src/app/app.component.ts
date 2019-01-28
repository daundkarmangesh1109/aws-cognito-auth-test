import { Component, OnInit } from '@angular/core';
import { CognitoAuth } from 'amazon-cognito-auth-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  auth: any;
  constructor() {
    //
  }

  ngOnInit() {
    this.auth = this.initCognitoSDK();
    const curUrl = window.location.href;
    console.log('curUrl: ', curUrl);
    this.auth.parseCognitoWebResponse(curUrl);
  }

  initCognitoSDK() {
    const authData = {
      ClientId: '11b65vi93c758vp1lf6eda3715', // Your client id here
      AppWebDomain: 'uat-univers.auth.ap-south-1.amazoncognito.com', // Exclude the "https://" part.
      TokenScopesArray: ['openid'], // like ['openid','email','phone']...
      RedirectUriSignIn: 'http://localhost:4200',
      UserPoolId: 'ap-south-1_b3KpbRme1',
      RedirectUriSignOut: 'http://localhost:4200',
      IdentityProvider: '', // e.g. 'Facebook',
      AdvancedSecurityDataCollectionFlag: false
    };

    const auth = new CognitoAuth(authData);

    auth.userhandler = {
      onSuccess: (result) => {
        alert('Sign in success: ' + auth.getCurrentUser());
        this.showSignedIn(result);
      },
      onFailure: (err) => {
        alert('Error!');
      }
    };
    auth.useCodeGrantFlow();

    return auth;
  }

  getSession() {
    this.auth.getSession();
  }

  showSignedIn(session) {
    console.log('Session: ', session);
  }
}
