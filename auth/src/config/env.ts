import { get } from 'env-var'

export const env = {
    userPoolId: get('USER_POOL_ID').required().asString(),
    clientId: get('CLIENT_ID').required().asString(),
}
