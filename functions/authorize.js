const {redirectUri, scopes, clientId} = require('./utils')

exports.handler = async (event, context) => {
  const location =
    'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    `&client_id=${clientId}` +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' +
    encodeURIComponent(redirectUri)
  console.log(redirectUri)
  return {
    statusCode: 301,
    body: '',
    headers: {
      Location: location,
    },
  }
}
