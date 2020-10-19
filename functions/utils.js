const fetch = require('node-fetch')

const scopes = 'user-read-recently-played'
const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const redirectUri = 'http://localhost:8888/.netlify/functions/callback'

exports.scopes = scopes
exports.clientId = clientId
exports.clientSecret = clientSecret
exports.redirectUri = redirectUri

btoa = (text) => Buffer.from(text).toString('base64')

const authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`

exports.getToken = async (code, grant_type = 'authorization_code') => {
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: authorization,
    },
    body: `grant_type=${grant_type}&code=${code}&redirect_uri=${redirectUri}`,
  })
    .then((res) => res.json())
    .catch(() => ({
      error: true,
    }))
}

exports.getUser = async (accessToken) => {
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

exports.storeUser = async (user) => {
  return fetch('http://localhost:8888/.netlify/functions/store', {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      accept: 'application/json',
    },
  })
    .then(() => false)
    .catch((error) => true)
}

const faunadb = require('faunadb')

exports.updateUser = async (user) => {
  const q = faunadb.query

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  })

  const item = {data: user}

  return client
    .query(
      q.Update(q.Select('ref', q.Get(q.Match(q.Index('id'), user.id))), {
        item,
      }),
    )
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}
