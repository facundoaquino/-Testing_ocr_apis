const fs = require('fs')

const files = fs.readFileSync('./history.json')

const parsedFiles = JSON.parse(files)

// console.log(parsedFiles.length)

const namesOnly = parsedFiles.map((file) => file.name.split('-D-').pop().split('.')[0])
const linesOnly = parsedFiles.map((file) => file.name.split('-L-').pop().split('-D-')[0])
console.log(linesOnly)

// namesOnly.forEach((file) => {
// 	fs.appendFileSync('./docs.txt', file + '\n', { encoding: 'utf-8' })
// })
linesOnly.forEach((file) => {
	fs.appendFileSync('./lines.txt', file + '\n', { encoding: 'utf-8' })
})
