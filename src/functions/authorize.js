const {redirectUri, scopes, clientId} = require('../utils/config.js')

exports.handler = async (event, context) => {
  const location =
    'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    `&client_id=${clientId}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`

  return {
    statusCode: 301,
    body: '',
    headers: {
      Location: location,
    },
  }
}
