const {getToken} = require('./get-token.js')
const {upsertUser} = require('../fauna/upsert-user.js')

exports.refreshToken = async user => {
  const {refreshToken} = user
  const {access_token: accessToken} = await getToken(
    refreshToken,
    'refresh_token',
  )
  const freshUser = {...user, accessToken}
  await upsertUser(freshUser)
  return freshUser
}
