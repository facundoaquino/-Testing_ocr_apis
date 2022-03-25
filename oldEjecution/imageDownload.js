// DESCARGA CON ENDPOINT VIEJO DE APEX
// http://platform.cognitivesa.com/#/download-files

require('dotenv').config()
const imageDownloader = require('node-image-downloader')

const colors = require('colors')
const { queryEjecution } = require('./queryEjecution')
const { singleDownload4 } = require('../singleDownloadUrl')

var argv = require('yargs/yargs')(process.argv.slice(2)).argv

const formatTime = (time) => {
	let str = time
	if (time < 10) str = `${0}${time}`
	return str.toString()
}
let timeFrom = ''
let timeTo = ''
if (argv.h) {
	timeTo = argv.h
	timeFrom = formatTime(Number(argv.h) - 1)
}
if (timeTo == '00') {
	timeFrom = '23'
}

const date = { day: argv.f, timeFrom, timeTo }
console.log(date)
const getData = async () => {
	const { data } = await queryEjecution(date)
	//es un array de objetos con la prop files donde vienen los archivos
	let photosRename = []
	data.forEach((dataArray) => {
		photosRename = dataArray.files.map((photo) => ({ uri: photo.url, filename: photo.name }))
	})

	photosRename.forEach((element) => {
		const rename = element.filename
		//le saco la extension porque la libreria ya lo baha con el nombre que tiene de la url
		const splited = rename.split('.')[0]
		element.filename = splited
	})

	// console.log(photosRefactorized.withouDoc)
	// console.log(photosRefactorized.whitDoc.length + photosRefactorized.withouDoc.length)
	if (!argv.h) {
		console.log(data)
		let dataArr = []
		data.forEach((d) => (dataArr = [...dataArr, ...d.files]))

		console.log('largo array = ', dataArr.length)
		await singleDownload4(dataArr)
		return
	}
	try {
		await imageDownloader({
			// imgs: [...photosRefactorized.whitDoc, ...photosRefactorized.withouDoc],
			// imgs: [...photosDocFilter.whitDoc, ...photosDocFilter.withouDoc],
			imgs: [...photosRename],
			dest: process.env.PATH_TO_DOWNLOAD, //destination folder
		})
	} catch (error) {
		console.log(error)
	}
}

const init = async () => {
	const [secondsStart] = process.hrtime()

	await getData()

	const [secondsEnd] = process.hrtime()

	console.log(
		colors.cyan(
			'Tiempo de Descarga ',

			secondsEnd - secondsStart,

			' segundos ya podes cerrar la ventana'
		)
	)
}

init()
