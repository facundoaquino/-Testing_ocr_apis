/*---------------------- RETORNA UN DATE CON LA ULTIMA MODIFICACION DEL ARCHIVO---------------------*/
const fs = require('fs')
const getLastModify = (path) => {
	const stats = fs.statSync(path)
	const last = stats.mtime

	return last
}

module.exports = getLastModify
