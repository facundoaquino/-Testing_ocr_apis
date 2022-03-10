require('dotenv').config()

const fs = require('fs')
const { trimExtension } = require('../Helpers/refactorNameFile')
const { readBook } = require('./readFileXlsx')

const searchCoincidences = (dataExel = []) => {
	console.log(dataExel)
	const filesWhihoutDoc = fs.readdirSync('../../wasapcorpo')

	const data = [...filesWhihoutDoc]
	console.log(data)
	let counter = 0

	for (let i = 0; i < dataExel.length; i++) {
		const element = dataExel[i]
		// console.log(element)
		for (let j = 0; j < data.length; j++) {
			const file = data[j]
			if (file.includes(element.linea) && !file.includes('-D-')) {
				// console.log({ linea: element.dni, file })
				const refactored = trimExtension(file)
				const strfileSplited = refactored.split('x')

				// console.log(strfileSplited)
				let str = strfileSplited[0] + '-D-' + element.dni
				if (strfileSplited.length > 1) {
					strfileSplited.forEach((element, i) => {
						if (i > 0) {
							str = str + 'x'
						}
					})
				}
				fs.rename(
					'../../wasapcorpo' + '/' + file,
					'../../wasapcorpo' + '/' + str + '.jpeg',
					() => {}
				)
				counter++
				data[j] = str
			}
		}
	}
	// console.log(indexesNot)
	console.log(`Documento agregado en ${counter}  fotos`)
	// console.log(data)
	// indexesNot.forEach((p) => data.push(photos[p]))
	// fs.writeFileSync('./test.json', JSON.stringify(data, null, 5))
	return data
}

const dataE = readBook('./../bases/gestionesFan_9_2.xlsx')
searchCoincidences(dataE)

module.exports = {
	searchCoincidences,
}
