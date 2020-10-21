const fetch = require('node-fetch')

exports.getUser = async (accessToken) => {
  return fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())
}
