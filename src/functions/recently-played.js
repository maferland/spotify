const {getId} = require('../utils/get-id.js')
const {getUserById} = require('../fauna/get-user-by-id.js')
const {refreshIfExpired} = require('../spotify/refresh-if-expired.js')
const {getRecentlyPlayed} = require('../spotify/get-recently-played.js')

exports.handler = async (event, context) => {
  const {path} = event
  const id = getId(path)

  try {
    const {data: user, ts} = await getUserById(id)

    const {accessToken} = await refreshIfExpired(user, ts)
    const response = await getRecentlyPlayed(accessToken)

    return {statusCode: 200, body: JSON.stringify(response)}
  } catch (error) {
    return {statusCode: 500, body: JSON.stringify(error)}
  }
}
