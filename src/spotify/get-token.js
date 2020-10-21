const {clientId, clientSecret, redirectUri} = require('../utils/config.js')
const {btoa} = require('../utils/btoa.js')
const fetch = require('node-fetch')

exports.getToken = async (code, grant_type = 'authorization_code') => {
  const authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`

  const body = [`&grant_type=${grant_type}`, `&redirect_uri=${redirectUri}`]

  if (grant_type === 'authorization_code') {
    body.push(`&code=${code}`)
  }

  if (grant_type === 'refresh_token') {
    body.push(`&refresh_token=${code}`)
  }

  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: authorization,
      grant_type: grant_type,
    },
    body: body.join(''),
  }).then(res => res.json())
}
