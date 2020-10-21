exports.getId = (path) => {
  return path.slice(path.lastIndexOf('/') + 1, path.length)
}
