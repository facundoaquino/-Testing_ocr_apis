require('dotenv').config()
const fs = require('fs')
const { deleteIfExists } = require('../Helpers/deleteIfExists')
const { readXlsx } = require('../readXls/readXlsx')

const deleteDocs = () => {
	const actualFiles = JSON.parse(fs.readFileSync('./bases/docs.json'))

	//console.log(actualFiles)
	let counter = 0
	const pathDocs = process.env.PATH_DOCS
	const data = readXlsx('./bases/aprobadas120.xlsx').map((e) => e['Nombre del contacto: DocumentNumber'])
	for (let i = 0; i < data.length; i++) {
		const dni = data[i]
		const str = dni + '.jpg'
		const str2 = dni + 'x.jpg'
		if (actualFiles[str] != -1) {
			deleteIfExists(`${pathDocs}/${str}`)
			counter++
			console.log(`${counter} archivos eliminados `)
		}
		if (actualFiles[str2] != -1) {
			deleteIfExists(`${pathDocs}/${str2}`)
			counter++
			console.log(`${counter} archivos eliminados `)
		}
	}
	console.log('TERMINADO...')
	console.log(`${counter} archivos eliminados `)
}

deleteDocs()
