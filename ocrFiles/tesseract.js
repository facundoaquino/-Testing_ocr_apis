const { createWorker } = require('tesseract.js')

const worker = createWorker()

const fs = require('fs')

const files = fs.readdirSync('./images')

;(async () => {
	await worker.load()
	await worker.loadLanguage('eng')
	await worker.initialize('eng')
	files.forEach(async (file) => {
		const {
			data: { text },
		} = await worker.recognize('./images/' + file)
		console.log(text)
	})
	await worker.terminate()
})()
