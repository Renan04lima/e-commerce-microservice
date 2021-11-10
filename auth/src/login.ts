import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { settings } from './settings';

class Login {
  private readonly userPool: AmazonCognitoIdentity.CognitoUserPool

  constructor(UserPoolId: string, ClientId:string ){
    this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId,
      ClientId,
    });
  }

  async main(event: any) {
    let {email, password} = JSON.parse(event.body);
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password,
    });
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          const access_token = result.getAccessToken().getJwtToken();
          const id_token = result.getIdToken().getJwtToken();
          resolve({
            statusCode: 200,
            body: {
              access_token: access_token,
              id_token:id_token
            },
          });
        },
        onFailure: function (err) {
          reject({
            statusCode: 500,
            body: JSON.stringify({
              message: err.message,
            }),
          });
        },
      });
    });
  }
}
const login = new Login(settings.userPoolId, settings.clientId)

export default login.main.bind(login)