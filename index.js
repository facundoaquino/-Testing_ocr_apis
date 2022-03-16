const { readDir } = require('./Helpers/readDir')
const fs = require('fs')
require('dotenv').config()
/*---------------------- PROBANDO LIBRERIA PARA COMPRIMIR IMAGENES ---------------------*/

const compress_images = require('compress-images')
const { compress } = require('compress-images/promise')
const { readXlsx } = require('./readXls/readXlsx')
const INPUT_path_to_your_images = process.env.PATH_DOCS + '/' + '14674619' + '.jpg'
const OUTPUT_path = './build/img/'

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

/*---------------------- FUNCION PARA PROBAR LECTURA DE EXEL CON LIBRERIA XLSX y comprimir imgs---------------------*/
// const init = async () => {
// 	const data = readXlsx(process.env.PATH_DOCS_CLOSES)
// 	//const files = fs.readdirSync(process.env.PATH_DOCS)

// 	const compressImg = async (path) => {
// 		await compress({
// 			source: path,
// 			destination: OUTPUT_path,
// 			enginesSetup: {
// 				jpg: { engine: 'mozjpeg', command: ['-quality', '50'] },
// 			},
// 		})
// 	}

// 	for (let i = 0; i < data.length; i++) {
// 		const { dni } = data[i]
// 		const pathOne = process.env.PATH_DOCS + '/' + dni + '.jpg'
// 		const pathTwo = process.env.PATH_DOCS + '/' + dni + 'x.jpg'
// 		const existsOne = fs.existsSync(pathOne)
// 		const existsTwo = fs.existsSync(pathTwo)
// 		if (existsOne) {
// 			await compressImg(pathOne)
// 		}
// 		if (existsTwo) {
// 			await compressImg(pathTwo)
// 		}
// 	}
// }

// init()
/*---------------------- COMPARAR TODOS LOS FILES DE AV DOC CON LA REPORTERIA A 90 DIAS O 120 DIAS---------------------*/

const data = readXlsx('./bases/aprobadas120.xlsx').map(
	(e) => e['Nombre del contacto: DocumentNumber']
)

const filesOnDisk = JSON.parse(fs.readFileSync('./bases/docs.json'))

console.log(filesOnDisk)

let coincidences = 0

for (let i = 0; i < data.length; i++) {
	const dni = data[i]
	const str = dni + '.jpg'
	const str2 = dni + 'x.jpg'
	if (filesOnDisk[str] != -1) {
		coincidences++
	}
	if (filesOnDisk[str2] != -1) {
		coincidences++
	}
}

console.log({ coincidences })
