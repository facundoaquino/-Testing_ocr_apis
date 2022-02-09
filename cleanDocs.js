const fs = require('fs')
const colors = require('colors')
const { refactorNameFile } = require('./Helpers/refactorNameFile')

const cleanDocs = () => {
	console.log(colors.cyan.italic('\n Moviendo archivos..'))

	const oldPath = './../wasapcorpo'
	const newPath = './../avdoc'

	const files = fs.readdirSync('./../wasapcorpo').filter((f) => f.includes('-D-'))

	// console.log(files)
	files.forEach((file) => {
		const nameFile = refactorNameFile(file)
		fs.renameSync(oldPath + `${'/' + file}`, newPath + `${'/' + nameFile}`)
	})
}

module.exports = { cleanDocs }
