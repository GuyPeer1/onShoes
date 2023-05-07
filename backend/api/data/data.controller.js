const dataService = require('./data.service.js')

const logger = require('../../services/logger.service')

module.exports = {
  getData
}

async function getData(req, res) {
  try {
    logger.debug('Getting Data')
    const data = await dataService.query()
    res.json(data)
  } catch (err) {
    logger.error('Failed to get data', err)
    res.status(500).send({ err: 'Failed to get data' })
  }
}
