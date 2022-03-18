const fs = require('fs')
require('dotenv').config()

const deleteIfExists = (path) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path)
	}
}

module.exports = { deleteIfExists }
