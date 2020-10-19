const {getUser, getToken, storeUser} = require('./utils.js')
const fetch = require('node-fetch')

const errorRes = {
  statusCode: 301,
  body: '',
  headers: {
    Location: '/error',
  },
}

exports.handler = async (event, context) => {
  const {queryStringParameters: {code} = {}} = event

  if (!code) {
    return errorRes
  }

  const {
    access_token: accessToken,
    expires_in: expiresIn,
    refresh_token: refreshToken,
    error,
  } = await getToken(code)

  if (error) {
    return errorRes
  }

  const user = await getUser(accessToken)

  if (user.error) {
    return errorRes
  }

  const storeResult = await storeUser({
    ...user,
    accessToken,
    expiresIn,
    refreshToken,
  })

  if (storeResult) {
    return errorRes
  }

  return {
    statusCode: 301,
    body: '',
    headers: {
      Location: '/success',
    },
  }
}
