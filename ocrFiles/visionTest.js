const vision = require('@google-cloud/vision')
const fs = require('fs')
process.env.GOOGLE_APPLICATION_CREDENTIALS = './keys/key.json'
const client = new vision.ImageAnnotatorClient()

const filesToread = fs.readdirSync('./images')
// console.log(filesToread)
/*---------------------- leer imagenes ---------------------*/

/*---------------------- leer texto de imagenes ---------------------*/
const myreg = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/

filesToread.forEach((file) => {
	let toChange = null
})

const readTextOnFile = async (file = null) => {
	const toRename = {}
	if (!file) return
	try {
		const results = await client.textDetection('./images/' + file)

		if (!results) return

		const detections = results[0].textAnnotations

		detections.forEach((text) => {
			if (myreg.test(text.description)) {
				// console.log(text.description)
				const docClean = text.description.replaceAll('.', '')
				toRename.path = './images/' + file
				toRename.new = './images2/' + docClean + '.jpg'
			}
		})

		return toRename
	} catch (error) {
		console.log(error)
	}
}

// readTextOnFile('./images/dni.jpg')

const readFiles = async (files) => {
	files.forEach(async (file) => {
		const rename = await readTextOnFile(file)
		if (rename.path) {
			fs.renameSync(rename.path, rename.new)
		}
	})
}

readFiles(filesToread)
