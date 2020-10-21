exports.clientId = process.env.SPOTIFY_CLIENT_ID
exports.clientSecret = process.env.SPOTIFY_CLIENT_SECRET

exports.scopes = 'user-read-recently-played'
exports.redirectUri = `${process.env.DEPLOY_URL}/.netlify/functions/callback`
