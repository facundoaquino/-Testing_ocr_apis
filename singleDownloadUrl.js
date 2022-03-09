// la funcion downloadImage esta en la siguiente url explicada , es una de varias maneras de bajar un archivo en nodejs
// https://scrapingant.com/blog/download-image-javascript

const fs = require('fs')
const Axios = require('axios')
const client = require('https')
const request = require('request')
const https = require('https')

/*---------------------- ********************************** ---------------------*/

async function downloadImage(url, filepath) {
	const response = await Axios({
		url,
		method: 'GET',
		responseType: 'stream',
		timeout: 5000,
	})
	return new Promise((resolve, reject) => {
		response.data
			.pipe(fs.createWriteStream(filepath))
			.on('error', reject)
			.once('close', () => resolve(filepath))
	})
}

const singleDownload = async (dataArr) => {
	// const data = await queryEjecution({ day: '2022-03-02', timeFrom: '07', timeTo: '08' })
	// const data = await queryEjecution({ day: '2022-03-02', timeFrom: '', timeTo: '' })
	// console.log(data.data)
	// let dataArr = []
	// data.data.forEach((d) => (dataArr = [...dataArr, ...d.files]))
	// console.log(dataArr)

	for (let i = 0; i < dataArr.length; i++) {
		const { url, name } = dataArr[i]
		//sin await , el proceso se rompe por demasiados archivos abiertos con await va lento aprox 1s por archivo pero cumple
		downloadImage(url, `./downloads/${name}`)
	}
}
/*---------------------- ********************************** ---------------------*/

function downloadImage2(url, filepath) {
	return new Promise((resolve, reject) => {
		client.get(url, (res) => {
			if (res.statusCode === 200) {
				res.pipe(fs.createWriteStream(filepath))
					.on('error', reject)
					.once('close', () => resolve(filepath))
			} else {
				// Consume response data to free up memory
				res.resume()
				reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`))
			}
		})
	})
}
const singleDownload2 = async (dataArr) => {
	// const data = await queryEjecution({ day: '2022-03-02', timeFrom: '07', timeTo: '08' })
	// const data = await queryEjecution({ day: '2022-03-02', timeFrom: '', timeTo: '' })
	// console.log(data.data)
	// let dataArr = []
	// data.data.forEach((d) => (dataArr = [...dataArr, ...d.files]))
	// console.log(dataArr)

	for (let i = 0; i < dataArr.length; i++) {
		const { url, name } = dataArr[i]
		//sin await , el proceso se rompe por demasiados archivos abiertos con await va lento aprox 1s por archivo pero cumple
		await downloadImage2(url, `./downloads/${name}`)
	}
}

// downloadImage2(
// 	'https://storage.googleapis.com/apex-telecom-whatsapp-prod-files/a8657f41-4be3-4c25-a685-abf4d31d2477.png',
// 	'./downloads/image.jpg'
// )

/*---------------------- ********************************** ---------------------*/
// codigo del script anterior para bajar por url

var download = function (uri, filename) {
	return new Promise((resolve, reject) => {
		request.head(uri, function (err, res, body) {
			// console.log({ uri })
			try {
				request(uri)
					.pipe(fs.createWriteStream(filename))
					.on('close', function () {
						resolve(filename)
					})
			} catch (e) {
				console.log(e)
			}
		})
	})
}

const singleDownload3 = async (dataArr) => {
	for (let i = 0; i < dataArr.length; i++) {
		const { url, name } = dataArr[i]
		await download(url, `./downloads/${name}`)
		console.log(i + 1, ' Archivos descargados...')
	}
}

/*---------------------- ********************************** ---------------------*/
const downloadWhitHttp = (url, filename, position) => {
	return new Promise((resolve, reject) => {
		https.get(url, function (res) {
			const fileStream = fs.createWriteStream(filename)
			res.pipe(fileStream)

			fileStream.on('finish', function () {
				fileStream.close()
				console.log(`Imagen ${position} descargada...`)

				resolve(filename)
			})
		})
	})
}

const singleDownload4 = async (dataArr) => {
	for (let i = 0; i < dataArr.length; i++) {
		const { url, name } = dataArr[i]
		await downloadWhitHttp(url, `./downloads/${name}`, i + 1)
	}
}

// download(
// 	'https://storage.googleapis.com/apex-telecom-whatsapp-prod-files/a8657f41-4be3-4c25-a685-abf4d31d2477.png',
// 	'./downloads/image.jpg'
// )

module.exports = {
	singleDownload,
	singleDownload2,
	singleDownload3,
	singleDownload4,
}
