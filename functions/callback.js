const {redirectUri, clientId, clientSecret, btoa} = require('./utils.js')
const fetch = require('node-fetch')

const errorRes = {
  statusCode: 301,
  body: '',
  headers: {
    Location: '/error',
  },
}

const authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`

const getToken = async (code) => {
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: authorization,
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
  })
    .then((res) => res.json())
    .catch(() => ({
      error: true,
    }))
}

const getUser = async (accessToken) => {
  return fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch(() => ({
      error: true,
    }))
}

const storeData = async (data) => {
  return fetch('http://localhost:8888/.netlify/functions/store', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      accept: 'application/json',
    },
  })
    .then(() => false)
    .catch((error) => true)
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

  const storeResult = await storeData({
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
