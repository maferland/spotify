exports.success = {
  statusCode: 301,
  body: '',
  headers: {
    Location: '/success',
  },
}

exports.error = {
  statusCode: 301,
  body: '',
  headers: {
    Location: '/error',
  },
}
