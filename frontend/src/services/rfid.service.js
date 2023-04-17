import tds from 'epc-tds'

export function generateBarcode(rfid = '303246280B066F0000989925') {
  var epc = tds.valueOf(rfid)
  var barcode = epc.toBarcode()
  var trimmedBarcode = barcode.slice(1) // Remove the first character

  return trimmedBarcode
}
