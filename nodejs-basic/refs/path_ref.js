const path = require('path')

console.log(__filename) // абсолютный путь
console.log(path.basename(__filename)) // название файла
console.log(path.dirname(__filename)) // название папки
console.log(path.extname(__filename)) // расширение

console.log(path.parse(__filename)) /* {
  root: 'C:\\',
  dir: 'C:\\projects\\vladilen-node-js-udemy\\nodejs-basic\\refs',
  base: 'path_ref.js',
  ext: '.js',
  name: 'path_ref'
} */

console.log(path.join(__dirname, 'test', 'second.html'))
console.log(path.resolve(__dirname, './test', '/second.html'))