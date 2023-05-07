const path = require('path')
const XLSX = require("xlsx")

const logger = require('../../services/logger.service')
const dataFile = path.join(__dirname, 'data.xlsx')

function query() {
  try {
    const workbook = XLSX.readFile(dataFile)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    logger.info(`Successfully read ${rows.length} rows from data file.`)
    return rows
  } catch (err) {
    logger.error(`Error while reading data: ${error.message}`)
    logger.error(`Error while reading data: ${err}`)
    throw err
  }
}

module.exports = {
  query
}
