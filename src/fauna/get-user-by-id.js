const faunadb = require('faunadb')

exports.getUserById = async id => {
  const q = faunadb.query

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  })

  return client
    .query(q.Get(q.Match(q.Index('users_search_by_id'), id)))
    .then(response => response)
}
