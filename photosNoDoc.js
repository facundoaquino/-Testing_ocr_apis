const { readBook } = require('./readFileXlsx')
const fs = require('fs')

const photosNoDoc = (photos = []) => {
	console.log('Fotos sin dni: ', photos.length)
	// console.log(photos)
	const dataExel = readBook('pendientes2.xlsx')
	// console.log(dataExel)

	const data = [...photos]
	let counter = 0

	for (let i = 0; i < dataExel.length; i++) {
		const element = dataExel[i]
		// console.log(element)
		for (let j = 0; j < data.length; j++) {
			const photo = data[j]
			if (photo.filename.includes(element.linea) && !photo.filename.includes('-D-')) {
				const strfileSplited = photo.filename.split('x')

				// console.log(strfileSplited)
				let str = strfileSplited[0] + '-D-' + element.dni
				if (strfileSplited.length > 1) {
					strfileSplited.forEach((element, i) => {
						if (i > 0) {
							str = str + 'x'
						}
					})
				}
				counter++
				data[j].filename = str
			}
		}
	}
	// console.log(indexesNot)
	console.log(`Documento agregado en ${counter}  fotos`)
	// indexesNot.forEach((p) => data.push(photos[p]))
	// fs.writeFileSync('./test.json', JSON.stringify(data, null, 5))
	return data
}

module.exports = { photosNoDoc }
