const { readDir } = require('./Helpers/readDir')
const fs = require('fs')
require('dotenv').config()
/*---------------------- PROBANDO LIBRERIA PARA COMPRIMIR IMAGENES ---------------------*/

const compress_images = require('compress-images')
const { readXlsx } = require('./readXls/readXlsx')
const INPUT_path_to_your_images = './downloads/*.{jpg,jpeg}'
const OUTPUT_path = 'build/img/'

// compress_images(
// 	INPUT_path_to_your_images,
// 	OUTPUT_path,
// 	{ compress_force: false, statistic: true, autoupdate: true },
// 	false,
// 	{ jpg: { engine: 'mozjpeg', command: ['-quality', '10'] } },
// 	{ png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
// 	{ svg: { engine: 'svgo', command: '--multipass' } },
// 	{ gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
// 	function (error, completed, statistic) {
// 		console.log('-------------')
// 		console.log(error)
// 		console.log(completed)
// 		console.log(statistic)
// 		console.log('-------------')
// 	}
// )

/*---------------------- RECUPERANDO LOS DATOS DE UN ARCHIVO ---------------------*/

// const fs = require('fs')
// const getFileUpdatedDate = (path) => {
// 	const stats = fs.statSync(path)
// 	console.log(stats)
// 	return stats.mtime
// }
// getFileUpdatedDate('./downloads/image.jpeg')

/*---------------------- FUNCION PARA PROBAR LECTURA DE EXEL CON LIBRERIA XLSX ---------------------*/

const data = readXlsx(process.env.PATH_DOCS_CLOSES)
const files = fs.readdirSync(process.env.PATH_DOCS)
let counter = 0
for (let i = 0; i < data.length; i++) {
	const { dni } = data[i]
	let times = 0
	const exists = fs.existsSync(process.env.PATH_DOCS + '/' + dni + '.jpg')
	const existsOr = fs.existsSync(process.env.PATH_DOCS + '/' + dni + 'x.jpg')
	if (exists || existsOr) {
		console.log(dni)
	}
}
