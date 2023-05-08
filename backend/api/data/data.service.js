const path = require('path')
const XLSX = require("xlsx")
const fs = require('fs')
const https = require("https")
const urlModule = require('url')
const download = require('image-downloader')

const logger = require('../../services/logger.service')
const dataFile = path.join(__dirname, 'data.xlsx')
const imageDirectory = path.join(__dirname,"..", "..", "..", "frontend", "src", "assets", "img", "shoes")

async function query() {
  try {
    const workbook = XLSX.readFile(dataFile)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    logger.info(`Successfully read ${rows.length} rows from data file.`)

    // Download images from links in imgPath column and save to imageDirectory
    const imgPathColumnIndex = rows[0].indexOf("imgPath")
    const urls = rows.slice(1).map((row) => row[imgPathColumnIndex]).filter(Boolean)
    const uniqueUrls = Array.from(new Set(urls))

    if (uniqueUrls.length > 0) {
      if (!fs.existsSync(imageDirectory)) {
        fs.mkdirSync(imageDirectory, { recursive: true });
      }
      for (const url of uniqueUrls) {
        // await downloadImage(url, imageDirectory)
      }
    }
    // downloadImage('https://images.globes.co.il/images/NewGlobes/big_image_800/2018/RTS212QK800x392.2018926T152749.jpg',imageDirectory)
    return rows
  } catch (err) {
    logger.error(`Error while reading data: ${err.message}`)
    throw err
  }
}

async function downloadImage(url, path) {
  const options = {
    url: url,
    dest: path            
  }
  try {
    const {filename} = await download.image(options)
    console.log('saved to', filename)
  } catch (err) {
    console.log(err)
  }
  // try {
  //   const {filename} = await download.image(options)
  //   console.log('saved to', filename)
  // } catch (err) {
  //   console.log(err)
  // }
}

module.exports = {
  query
}
