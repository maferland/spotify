const faunadb = require('faunadb')
const fetch = require('node-fetch')
const {getToken, updateUser} = require('./utils.js')

const findUser = async (userId) => {
  const q = faunadb.query

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  })

  try {
  } catch (error) {}

  return client
    .query(q.Get(q.Match(q.Index('users_search_by_id'), userId)))
    .then((response) => response)
    .catch((error) => {
      throw {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}

const refreshUser = async (user) => {
  const refreshedUser = await getToken(refreshToken)
  return await updateUser({...user, ...refreshedUser})
}

const getRecentlyPlayed = async (accessToken) => {
  return fetch('https://api.spotify.com/v1/me/player/recently-played', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((body) => {
      return {
        statusCode: 200,
        body: JSON.stringify(body),
      }
    })
    .catch((error) => {
      throw {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}

exports.handler = async (event, context) => {
  const {path} = event
  const id = path.slice(path.lastIndexOf('/') + 1, path.length)
  try {
    let {data: user, ts} = await findUser(id)
    const {expiresIn} = user
    if (ts + expiresIn > new Date().getTime() * 1000) {
      user = await refreshUser(user)
    }
    return await getRecentlyPlayed(user.accessToken)
  } catch (error) {
    return error
  }
}
