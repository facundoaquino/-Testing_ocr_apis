const { default: axios } = require('axios')
require('dotenv').config()

const fs = require('fs')

const replaceFile = (wrong, ok) => {
	//vamos a usar esta regex para evaluar si el nombre del archivo tiene dos xx o mas para descartarlo

	const path = process.env.PATH_DOCS

	if (fs.existsSync(path + `${'/' + wrong}.jpg`)) {
		fs.renameSync(path + `${'/' + wrong}.jpg`, path + `/${ok}.jpg`)
		console.log(`Archivo ${wrong}  arreglado`)
	} else if (fs.existsSync(path + `${'/' + wrong}.jpeg`)) {
		fs.renameSync(path + `${'/' + wrong}.jpeg`, path + `/${ok}.jpeg`)
		console.log(`Archivo ${wrong}  arreglado`)
	}
}

const init = async () => {
	const date = new Date()

	const actualDate = date.toISOString().split('T')[0]

	//const body = {
	//	from: `${actualDate} 00:00:00`,
	//	to: `${actualDate} 23:59:59`,
	//}
	//const data = await axios.post(process.env.API_URL, body, {
	//	headers: {
	//		Authorization: 'Bearer ' + process.env.BEARER_TOKEN_NEW,
	//		'Content-Type': 'application/json',
	//	},
	//})
	//
	//const files = data.data.map((f) => f.name).filter((f) => f.includes('-D-'))
	//const cleanFiles = files.map((file) => file.split('-D-').pop())
	//const normalDoc = cleanFiles.filter((f) => f.length <= 14)
	//const longDoc = cleanFiles.filter((f) => f.length > 13 && !f.includes('x'))

	console.log('leyendo de av doc')
	const filesDocs = fs.readdirSync(process.env.PATH_DOCS)
	const goodfiles = filesDocs.filter((f) => f.length <= 14)
	const filesLong = filesDocs.filter((file) => file.length > 13 && !file.includes('x'))
	console.log(filesLong)

	for (let i = 0; i < filesLong.length; i++) {
		const wrongfile = filesLong[i].split('.')[0]
		// console.log(wrongfile)
		for (let j = 0; j < goodfiles.length; j++) {
			let goodfile = goodfiles[j].split('.')[0]
			let fileFinal = goodfile
			if (goodfile.includes('x')) {
				fileFinal = goodfile.split('x')[0]
				if (wrongfile.includes(fileFinal)) {
					console.log({ goodfile, wrongfile })
					//	replaceFile(wrongfile, fileFinal)
					break
				}
			}
		}
		console.log('termino ok ' + i)
	}

	// console.log(longDoc)
}

init()
