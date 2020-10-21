const {getToken} = require('../spotify/get-token.js')
const {getUser} = require('../spotify/get-user.js')
const {upsertUser} = require('../fauna/upsert-user.js')
const {success, error} = require('../utils/response.js')

exports.handler = async (event, context) => {
  try {
    const {queryStringParameters: {code} = {}} = event

    if (!code) {
      return error
    }

    const {
      access_token: accessToken,
      expires_in: expiresIn,
      refresh_token: refreshToken,
    } = await getToken(code)

    const {id} = await getUser(accessToken)

    await upsertUser({
      id,
      accessToken,
      expiresIn,
      refreshToken,
    })

    return success
  } catch (err) {
    return error
  }
}
