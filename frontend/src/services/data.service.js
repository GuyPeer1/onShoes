
import * as XLSX from "xlsx"
import dataFile from '../assets/data.xlsx'
import { generateBarcode } from "../services/rfid.service.js"

export const dataService = {
    loadData,
    getShoe,
    getShoeStats
}

async function loadData() {
    try {
      const response = await fetch(dataFile)
      const blob = await response.blob()
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = (event) => {
          const binaryStr = event.target.result
          const workbook = XLSX.read(binaryStr, { type: "binary" })
          const worksheet = workbook.Sheets[workbook.SheetNames[0]]
          const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
          resolve(rows)
        }
        reader.onerror = (error) => {
          reject(error)
        }
        reader.readAsBinaryString(blob)
      })
    } catch (error) {
      console.log("Error while fetching data: ", error)
      throw error
    }
  }

  function getShoe(data, RFID) {
    if (RFID.length !== 24) return null
    const columnIndex = data[0].indexOf('barcode')
    const filteredRow = data.find(row => row[columnIndex] === +generateBarcode(RFID))
    // console.log(+generateBarcode(RFID))
    const shoe = {info: [data[0], filteredRow], stats: ''}
    shoe.stats = getShoeStats(shoe.info)
    return shoe
}
  
function getShoeStats(shoeInfo) {
  const headers = shoeInfo[0]
  const activityIndex = headers.indexOf('activity')
  const surfaceIndex = headers.indexOf('surface')
  const distanceIndex = headers.indexOf('running_distance')
  const dampingIndex = headers.indexOf('damping')
  const compIndex = headers.indexOf('comp')
  let distanceWord
  const activityValue = shoeInfo[1][activityIndex]
  const surfaceValue = shoeInfo[1][surfaceIndex]
  const distanceValue = shoeInfo[1][distanceIndex]
  if (distanceValue === '42.2K') distanceWord = 'ארוך'
  else if (distanceValue === '21.1K') distanceWord = 'בינוני'
  else if (distanceValue === '10K') distanceWord = 'קצר'

  const dampingValue = shoeInfo[1][dampingIndex]
  const compValue = shoeInfo[1][compIndex]

  const updatedStats = stats.map(stat => {
      switch (stat.type) {
          case 'סוג פעילות':
              return {
                  ...stat,
                  chosen: activityValue
              }
          case 'משטח':
              return {
                  ...stat,
                  chosen: surfaceValue
              }
          case 'מרחק ריצה':
              return {
                  ...stat,
                  chosen: distanceWord
              }
          case 'שיכוך':
              return {
                  ...stat,
                  chosen: dampingValue
              }
          case 'תחרות':
              return {
                  ...stat,
                  chosen: compValue
              }
          default:
              return stat
      }
  })
  return updatedStats
}

let stats =
[
    { type: 'סוג פעילות', id: 1, firstOption: 'תמיכה ונוחות', secondOption: 'ריצה ואימון', thirdOption: 'אופנה ויום יום' },
    { type: 'משטח', id: 2, firstOption: 'שטח', secondOption: 'אימון בבית', thirdOption: 'כביש' },
    { type: 'מרחק ריצה', id: 3, firstOption: 'ארוך', secondOption: 'בינוני', thirdOption: 'קצר' },
    { type: 'שיכוך', id: 4, firstOption: 'מקסימלי ', secondOption: 'בינוני', thirdOption: 'קל' },
    { type: 'תחרות', id: 5, firstOption: 'כן', secondOption: 'לא' }
]





