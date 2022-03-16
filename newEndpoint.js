const colors = require('colors')
require('dotenv').config()
const ImageDownloader = require('node-image-downloader/src/image-downloader')
const {
	singleDownload,
	singleDownload2,
	singleDownload3,
	singleDownload4,
} = require('./singleDownloadUrl')
var argv = require('yargs/yargs')(process.argv.slice(2)).argv

const axios = require('axios').default

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

const date = { day: argv.f, timeFrom, timeTo }
const queryEjecution = async ({ day, timeFrom, timeTo }) => {
	console.log(colors.rainbow('DESCARGANDO ARCHIVOS'))
	if (timeTo !== '') {
		timeTo = timeTo + ':00:00'
		timeFrom = timeFrom + ':00:00'
	}
	const url = process.env.API_URL
	console.log(url)

	const body = {
		from: `${day} ${timeFrom}`,
		to: `${day} ${timeTo}`,
	}
	if (timeTo === '') {
		body.from = `${day} 00:00:00`
		body.to = `${day} 23:59:59`
	}
	console.log(
		colors.bgCyan.black(
			`Descargando del dia ${day} de ${timeFrom ? timeFrom : '00:00'} hs  a ${
				timeTo ? timeTo : '23:59'
			}hs`
		)
	)
	const data = await axios.post(url, body, {
		headers: {
			Authorization: 'Bearer ' + process.env.BEARER_TOKEN_NEW,
			'Content-Type': 'application/json',
		},
	})
	// console.log(data.data)

	let photosRename = []

	photosRename = data.data.map((photo) => ({
		uri: photo.url,
		filename: photo.name
			.split('.')
			.slice(0, photo.name.split('.').length - 1)
			.join(''),
	}))
	// DESCARGA DE IMAGENES CON LIBRERIA node-image-downloader

	await ImageDownloader({
		// imgs: [...photosRefactorized.whitDoc, ...photosRefactorized.withouDoc],
		// imgs: [...photosDocFilter.whitDoc, ...photosDocFilter.withouDoc],
		imgs: [...photosRename],
		dest: './images', //destination folder
	})

	console.log(colors.magenta('Archivos descargados : ', data.data.length))
	return data.data
}

queryEjecution(date)

module.exports = {
	queryEjecution,
}
