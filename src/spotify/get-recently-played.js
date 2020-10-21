const fetch = require('node-fetch')

exports.getRecentlyPlayed = async accessToken => {
  return fetch('https://api.spotify.com/v1/me/player/recently-played', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.json())
}
