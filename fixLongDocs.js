const { default: axios } = require('axios')
require('dotenv').config()

const init = async () => {
	const date = new Date()

	const actualDate = date.toISOString().split('T')[0]

	const body = {
		from: `${actualDate} 00:00:00`,
		to: `${actualDate} 23:59:59`,
	}
	const data = await axios.post(process.env.API_URL, body, {
		headers: {
			Authorization: 'Bearer ' + process.env.BEARER_TOKEN_NEW,
			'Content-Type': 'application/json',
		},
	})

	const files = data.data.map((f) => f.name).filter((f) => f.includes('-D-'))
	const cleanFiles = files.map((file) => file.split('-D-').pop())
	const normalDoc = cleanFiles.filter((f) => f.length <= 13 || f.includes('x'))
	const longDoc = cleanFiles.filter((f) => f.length > 13 && !f.includes('x'))

	for (let i = 0; i < longDoc.length; i++) {
		const wrongfile = longDoc[i].split('.')[0]
		// console.log(wrongfile)
		for (let j = 0; j < normalDoc.length; j++) {
			const goodfile = normalDoc[j].split('.')[0]
			if (wrongfile.includes(goodfile)) {
				console.log({ goodfile, wrongfile })
			}
		}
	}

	// console.log(longDoc)
}

init()
