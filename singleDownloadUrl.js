// la funcion downloadImage esta en la siguiente url explicada , es una de varias maneras de bajar un archivo en nodejs
// https://scrapingant.com/blog/download-image-javascript

const fs = require('fs')
const Axios = require('axios')

const client = require('https')

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
		await downloadImage(url, `./downloads/${name}`)
	}
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

async function downloadImage(url, filepath) {
	const response = await Axios({
		url,
		method: 'GET',
		responseType: 'stream',
	})
	return new Promise((resolve, reject) => {
		response.data
			.pipe(fs.createWriteStream(filepath))
			.on('error', reject)
			.once('close', () => resolve(filepath))
	})
}

downloadImage2(
	'https://storage.googleapis.com/apex-telecom-whatsapp-prod-files/a8657f41-4be3-4c25-a685-abf4d31d2477.png',
	'./downloads/image.jpg'
)

module.exports = {
	singleDownload,
	singleDownload2,
}
