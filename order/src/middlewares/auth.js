const CognitoExpress = require('cognito-express')
const env = require('env-var')

const cognitoExpress = new CognitoExpress({
  region: env.get('REGION_AWS').required().asString(),
  cognitoUserPoolId: env.get('COGNITO_USER_POOL_ID').required().asString(),
  tokenUse: 'id',
  tokenExpiration: 3600000
})

const auth = (req, res, next) => {
  let idToken = req.headers.authorization
  if (!idToken) return res.status(401).send({ message: 'ID Token missing from header' })

  const [bearer, realToken] = idToken.split(' ')
  if (!/Bearer/.test(bearer)) {
    return res.status(401).send({ message: 'token unformat' })
  }
  cognitoExpress.validate(realToken, function (err, response) {
    if (err) return res.status(401).send(err)
    res.locals.user = response
    next()
  })
}

module.exports = { auth }