const {refreshToken} = require('./refresh-token.js')

exports.refreshIfExpired = async (user, ts) => {
  const {expiresIn} = user
  const isExpired = ts + expiresIn < new Date().getTime() * 1000
  const newUser = isExpired ? await refreshToken(user) : user
  return newUser
}
