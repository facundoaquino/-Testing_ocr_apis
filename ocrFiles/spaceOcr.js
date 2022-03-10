const { ocrSpace } = require('ocr-space-api-wrapper')
require('dotenv').config()

const fs = require('fs')
const filesToread = fs.readdirSync('./images')
const myreg = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/

async function dniDetector(file = null) {
	const filestoRename = []
	if (!file) return
	try {
		const data = await ocrSpace(`./images2/${file}`, {
			apiKey: process.env.API_KEY_OCRSPACE,
			isOverlayRequired: true,
			detectOrientation: true,
		})

		if (!data) return
		const results = data.ParsedResults[0]?.TextOverlay?.Lines
		// console.log(results.length)
		if (!results) return
		results.forEach((text) => {
			if (myreg.test(text.LineText)) {
				// filestoRename.push({
				// 	file: `./images/${file}`,
				// 	new: `./images/${text.LineText}.jpg`,
				// })
				// fs.renameSync(`./images/${file}`, `./images/${text.LineText}.jpg`)
				console.log(text.LineText)
			}
		})
	} catch (error) {
		console.error(error)
	}
	return filestoRename
}

// dniDetector('entre.jpg')

const readFiles = async (files) => {
	const toRename = []
	files.forEach(async (file) => {
		const obj = await dniDetector(file)
		toRename.push(obj)
	})
}
// console.log(filesToread)

const renameFiles = (files) => {}

readFiles(filesToread)

// renameFiles(files)
