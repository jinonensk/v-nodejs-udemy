const fs = require('fs')
const path = require('path')

// File system


// fs.mkdir(path.join(__dirname, 'notes'), err => {
//   // if (err) throw new Error(err)
//   if (err) throw err

//   console.log('folder was created')
// })


// fs.writeFile(
//   path.join(__dirname, 'notes', 'myNotes.txt'),
//   'Hello world',
//   err => {
//     if (err) throw err
//     console.log('The file was created')

//     fs.appendFile(
//       path.join(__dirname, 'notes', 'myNotes.txt'),
//       ' From append file',
//       err => {
//         if (err) throw err
//         console.log('file was changed')
//       },
//     )

//     fs.readFile(
//       path.join(__dirname, 'notes', 'myNotes.txt'),
//       'utf-8',
//       (err, data) => {
//         if (err) throw err
//         console.log(data)
//         // console.log(Buffer.from(data).toString())
//       },
//     )
//   },
// )


fs.rename(
  path.join(__dirname, 'notes', 'myNotes.txt'),
  path.join(__dirname, 'notes', 'notes.txt'),
  (err) => {
    if (err) throw err

    console.log('file was renamed')
  }
)