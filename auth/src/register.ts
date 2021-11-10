import { CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js'
import { env } from './config/env';

class Register {
  private readonly userPool: CognitoUserPool

  constructor(UserPoolId: string, ClientId:string ){
    this.userPool = new CognitoUserPool({
      UserPoolId,
      ClientId,
    });
  }

  async main(event: any) {
    let { name, email, password } = JSON.parse(event.body);
    let dataName = {
      Name: "name",
      Value: name,
    }
    let dataEmail = {
      Name: "email",
      Value: email,
    }
    let attributeList = [];
      attributeList.push(new CognitoUserAttribute(dataName));
      attributeList.push(new CognitoUserAttribute(
      dataEmail
    ));

    try {
      const credencials = await this.registerWithCognito(email, password, attributeList)
      return {
        statusCode: 200,
        body: JSON.stringify(credencials),
      }
    } catch (err) {
      if(err?.code === 'InvalidPasswordException'){
        return {
          statusCode: 400,
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

  private async registerWithCognito(email: string, password: string, attributeList: CognitoUserAttribute[]) {
    return new Promise((resolve, reject) => {
      this.userPool.signUp(
      email,
      password,
      attributeList,
      null,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
    });
  }
}

const register = new Register(env.userPoolId, env.clientId)

export default register.main.bind(register)