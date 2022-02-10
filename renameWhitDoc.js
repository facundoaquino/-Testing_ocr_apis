require('dotenv').config()
const fs = require('fs')
const { readBook } = require('./readFileXlsx')
const { searchCoincidences } = require('./searchCoincidences')

const pathToRelocated = process.env.PATH_FILESWHITDOC
const pathActual = process.env.PATH_TO_DOWNLOAD
// console.log(pathToRelocated)
const renameWhitDoc = () => {
	const files = fs.readdirSync(pathActual)
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
//leer exel .xlsx

const dataExel = readBook('./bases/gestionesFan_9_2.xlsx')

searchCoincidences(dataExel)

// const parseData = fs.readFileSync('./jsonsTest/pendDocs.json')
// console.log(JSON.parse(parseData))
// console.log('largo ', JSON.parse(parseData).length)

module.exports = {
	renameWhitDoc,
}
