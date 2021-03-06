const colors = require('colors')
require('dotenv').config()

const axios = require('axios').default

const queryEjecution = async ({ day, timeFrom, timeTo }) => {
	console.log(colors.rainbow('DESCARGANDO ARCHIVOS'))
	if (timeTo !== '') {
		if (timeFrom == '23') {
			timeFrom = '23:00'
			timeTo = '23:59'
		} else {
			timeTo = timeTo + ':00'
			timeFrom = timeFrom + ':00'
		}
	}

	const url = `${process.env.URL_API}/&offset=0&name=&phone=&ticket=&timeFrom=${timeFrom}&fromDate=${day}&toDate=${day}&timeTo=${timeTo}`
	console.log(url)

	const data = await axios.get(url, {
		headers: {
			'x-access-token': process.env.ACCESS_TOKEN,
		},
	})
	// console.log(data.data)
	let total = 0
	data.data.forEach((d) => (total += d.files.length))
	console.log('Total de archivos : ', total)
	return data
}

module.exports = {
	queryEjecution,
}
