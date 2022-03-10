const fs = require('fs')
const { queryEjecution } = require('./oldEjecution/queryEjecution')

const counterByTicket = (tickets = [], day) => {
	const sumCounter = tickets.reduce((acc, el) => {
		acc[el] ? (acc[el] = acc[el] + 1) : (acc[el] = 1)
		return acc
	}, {})
	console.log(sumCounter)
	fs.writeFileSync(`./jsonsTest/${day}.json`, JSON.stringify(sumCounter))
}

const countTickets = async () => {
	const date = { day: '2022-02-07', timeFrom: '', timeTo: '' }
	const { data } = await queryEjecution(date)
	console.log(data)
	let total = []
	data.forEach((d) => (total = [...total, ...d.files]))
	console.log(total)
	console.log('Total de archivos : ', total.length)

	let ticketsHash = []
	ticketsHash = total.map((file) => {
		if (!file.name.includes('-D-')) {
			return file.name.split('_')[1].split('-')[0]
		}
	})
	console.log(ticketsHash)
	counterByTicket(ticketsHash, date.day)
}

countTickets()

module.exports = {
	countTickets,
}
