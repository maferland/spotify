const faunadb = require('faunadb')

/* configure faunaDB Client with our secret */

exports.upsertUser = async user => {
  const q = faunadb.query

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  })

  const item = {id: user.id, data: user}

  return client
    .query(
      q.If(
        q.Exists(q.Match(q.Index('users_search_by_id'), user.id)),
        q.Replace(
          q.Select(
            'ref',
            q.Get(q.Match(q.Index('users_search_by_id'), user.id)),
          ),
          item,
        ),
        q.Create(q.Ref('classes/users'), item),
      ),
    )
    .then(response => response)
}
