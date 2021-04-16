module.exports = {
  ifeq(a, b, options) {
    console.log(a, b)
    // TODO some problem with ===
    // if (a == b) {
    //   return options.fn(this)
    // }
    // return options.inverse(this)
    return a == b ? options.fn(this) : options.inverse(this)
  },
}
