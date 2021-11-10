import * as env from 'env-var'

export const settings = {
    userPoolId: env.get('USER_POOL_ID').required().asString(),
    clientId: env.get('CLIENT_ID').required().asString(),
}
