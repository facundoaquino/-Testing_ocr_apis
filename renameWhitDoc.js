require('dotenv').config()
const fs = require('fs')

const pathToRelocated = process.env.PATH_FILESWHITDOC
const pathActual = process.env.PATH_TO_DOWNLOAD
// console.log(pathToRelocated)
const renameWhitDoc = async () => {
	const files = await fs.readdirSync(pathActual)
	console.log('archivos en carpeta: ', files.length)
	const filesWhitDoc = files.filter((file) => file.includes('-D-'))
	console.log('archivos con DNI incluido ', filesWhitDoc.length)
	console.log('archivos sin DNI   ', files.length - filesWhitDoc.length)

	for (const file of filesWhitDoc) {
		fs.renameSync(pathActual + '/' + file, pathToRelocated + '/' + file)
	}

	return
}

renameWhitDoc()

module.exports = {
	renameWhitDoc,
}
