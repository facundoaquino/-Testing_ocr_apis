// cleanDocs agarra lo que esta en la carpeta de descarga , y a los archivos con dni agarra solo "frente y dorso " ddddddd.jpg ddddddx.jpg y los pasa a carpetas de documentos doc

require('dotenv').config()
const fs = require('fs')

const colors = require('colors')
const { refactorNameFile } = require('./Helpers/refactorNameFile')

const cleanDocs = () => {
	console.log(colors.cyan.italic('\n Moviendo archivos..'))
	//vamos a usar esta regex para evaluar si el nombre del archivo tiene dos xx o mas para descartarlo

	const oldPath = process.env.PATH_TO_DOWNLOAD
	const newPath = process.env.PATH_FILESWHITDOC

	const files = fs
		.readdirSync(process.env.PATH_TO_DOWNLOAD)
		.filter((file) => file.includes('-D-'))

	// console.log(files)
	files.forEach((file) => {
		const nameFile = refactorNameFile(file)
		// si el archivo tiene 2 xx o mas se borra sino se pasa a documentos ok ddddddd.jpg ddddddx.jpg
		//console.log(nameFile)
		if (nameFile.includes('xx')) {
			fs.unlink(`${oldPath + '/' + file}`, (err) => {
				if (err) {
					console.log(err)
				}
			})
		} else {
			fs.renameSync(oldPath + `${'/' + file}`, newPath + `${'/' + nameFile}`)
		}
	})
}

cleanDocs()
module.exports = { cleanDocs }
