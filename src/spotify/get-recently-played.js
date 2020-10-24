const fetch = require('node-fetch')

exports.getRecentlyPlayed = async (accessToken, limit = 10) => {
  return fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  ).then(res => res.json())
}
