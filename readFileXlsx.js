const XLSX = require('xlsx')

const readBook = (path) => {
	const workbook = XLSX.readFile(path)
	const workbookSheets = workbook.SheetNames
	console.log(workbookSheets)

	const sheet = workbookSheets[0]
	const dataExel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]).map((e) => ({
		linea: e['LineNumber'],
		dni: e['Nombre del contacto: DocumentNumber'],
	}))

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
