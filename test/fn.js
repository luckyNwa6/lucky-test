function add(a, b) {
  return a + b
}

function add2(a, b) {
  document.getElementById('sum').innerHTML = a + b
}

module.exports = {
  add,
  add2,
}
