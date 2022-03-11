const { readDir } = require('./Helpers/readDir')

require('dotenv').config()

const files = readDir(process.env.PATH_DOCS)
console.log(files)
