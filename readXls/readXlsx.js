const XLSX = require('xlsx')

const readXlsx = (path, column = null) => {
	const workbook = XLSX.readFile(path)
	const workbookSheets = workbook.SheetNames
	console.log(workbookSheets)

	const sheet = workbookSheets[0]
	console.log(sheet)
	// const dataExel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { header: 'LineNumber' })
	const dataExel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
	//	console.log(dataExel)
	return dataExel
}

module.exports = {
	readXlsx,
}
