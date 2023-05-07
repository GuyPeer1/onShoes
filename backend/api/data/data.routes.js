const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getData } = require('./data.controller.js')
const router = express.Router()

router.get('/', log, getData)

module.exports = router