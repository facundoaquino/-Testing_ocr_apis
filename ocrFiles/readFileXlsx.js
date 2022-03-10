const XLSX = require('xlsx')
const fs = require('fs')
const readBook = (path) => {
	const workbook = XLSX.readFile(path)
	const workbookSheets = workbook.SheetNames
	console.log(workbookSheets)

	const sheet = workbookSheets[0]
	console.log(sheet)
	// const dataExel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { header: 'LineNumber' })
	const dataExel = XLSX.utils
		.sheet_to_json(workbook.Sheets[sheet])
		.filter((f) => f['Estado'] == 'Pendiente de envío de documentación')
		.map((e) => ({
			linea: e['Pin Line'],
			dni: e['Nombre del contacto: DocumentNumber'],
			estado: e['Estado'],
		}))

	console.log('Pendientes de documentacion ', dataExel.length)
	// dataExel.forEach((f, i) => {
	// 	if (i < 500) console.log(f)
	// })

	// const dataToJson = JSON.stringify(dataExel)
	// fs.writeFileSync('jsonsTest/pendDocs.json', dataToJson)

	// console.log(dataExel)
	return dataExel
}

/*----------------------  ---------------------*/

const analizeResponse = async () => {
	// const { data } = await queryEjecution()

	console.log('cantidad de fotos descargadas : ', data[0].files.length)

	const filteredLines = data[0].files.filter((d) => !d.name.includes('-D-'))
	console.log('Lineas sin dni: ', filteredLines.length)
	// console.log(filteredLines)
	const dataExel = readBook('pendientes2.xlsx')

	// for (let i = 0; i < dataExel.length; i++) {
	// 	const element = dataExel[i]
	// 	for (let j = 0; j < filteredLines.length; j++) {
	// 		const photo = filteredLines[j]
	// 		if (photo.name.includes(element.linea)) {
	// 			console.log(photo)
	// 		}
	// 	}
	// }

	// return data
	const resultFiltered = dataExel.map((data) => {
		const element = filteredLines.find((d) => d.name.includes(data.linea))
		if (element) {
			// console.log(element)
			return { ...element, linea: data.linea, dni: data.dni }
		}
	})
	const result = resultFiltered.filter((e) => e)
	console.log('lineas ', result.length)
	console.log(result)
}
// analizeResponse()

/*----------------------  ---------------------*/

module.exports = {
	readBook,
}
