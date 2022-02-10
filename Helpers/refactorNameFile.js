//formatear nombre de archivo dejando el numero de dni XXXXXX.JPG

const refactorNameFile = (file = '') => {
	let str = ''
	const lastIndex = file.lastIndexOf('-')
	//sumo uno para que no incluya el guion
	str = file.substring(lastIndex + 1)

	return str
}

const trimExtension = (file = '') => {
	let str = file
	const strSplited = str.split('.')

	return strSplited.slice(0, strSplited.length - 1).join('')
}

module.exports = { refactorNameFile, trimExtension }
