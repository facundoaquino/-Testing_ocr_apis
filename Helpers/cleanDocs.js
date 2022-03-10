require('dotenv').config()
const fs = require('fs')

const colors = require('colors')
const { refactorNameFile } = require('./refactorNameFile')

const cleanDocs = () => {
	console.log(colors.cyan.italic('\n Moviendo archivos..'))

	const oldPath = process.env.PATH_TO_DOWNLOAD
	const newPath = process.env.PATH_FILESWHITDOC

	const files = fs.readdirSync(process.env.PATH_TO_DOWNLOAD).filter((f) => f.includes('-D-'))

	// console.log(files)
	files.forEach((file) => {
		const nameFile = refactorNameFile(file)
		fs.renameSync(oldPath + `${'/' + file}`, newPath + `${'/' + nameFile}`)
	})
}

cleanDocs()
module.exports = { cleanDocs }
