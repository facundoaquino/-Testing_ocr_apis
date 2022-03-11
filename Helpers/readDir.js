const fs = require('fs')

const readDir = (path) => {
	console.log('leyendoooo')
	const files = fs.readdirSync('//apac-fs2/grupos/PRIVADO/AV-DOC/DOC')

	console.log('cantidad de archivos: ' + files.length)
	return files
}

module.exports = { readDir }
