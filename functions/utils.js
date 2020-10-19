exports.scopes = 'user-read-recently-played'
exports.clientId = process.env.SPOTIFY_CLIENT_ID
exports.clientSecret = process.env.SPOTIFY_CLIENT_SECRET
exports.redirectUri = 'http://localhost:8888/.netlify/functions/callback'

exports.btoa = (text) => Buffer.from(text).toString('base64')
