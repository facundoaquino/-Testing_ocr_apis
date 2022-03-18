const fs = require('fs')
require('dotenv').config()

const deleteIfExists = (path) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path)
	}
}

deleteIfExists(
	process.env.PATH_DOCS +
		'/' +
		'5493364573827xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.jpeg'
)

module.exports = { deleteIfExists }
