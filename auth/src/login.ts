import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserSession} from 'amazon-cognito-identity-js'
import { env } from './config/env';

class Login {
  private readonly userPool: CognitoUserPool

  constructor(UserPoolId: string, ClientId:string ){
    this.userPool = new CognitoUserPool({
      UserPoolId,
      ClientId,
    });
  }

  async main(event: any) {
    let {email, password} = JSON.parse(event.body);
    let authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    let cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    try {
      const credencials = await this.loginWithCognito(cognitoUser, authenticationDetails)
      return {
        statusCode: 200,
        body: JSON.stringify(credencials),
      }
    } catch (err) {
      if(err?.code === 'UserNotConfirmedException'){
        return {
          statusCode: 401,
          body: JSON.stringify({
            error: err.message
          }),
        }
      }
      if(err?.code === 'NotAuthorizedException'){
        return {
          statusCode: 403,
          body: JSON.stringify({
            error: err.message
          }),
        }
      }

      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({
            error: 'Server failed. Try again soon.'
        }),
      }
    }
  }

  private async loginWithCognito(cognitoUser: CognitoUser, authenticationDetails: AuthenticationDetails) {
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          const access_token = result.getAccessToken().getJwtToken();
          const id_token = result.getIdToken().getJwtToken();
          resolve({
            access_token,
            id_token
          });
        },
        onFailure: reject
      });
    });
  }
}

const login = new Login(env.userPoolId, env.clientId)

export default login.main.bind(login)