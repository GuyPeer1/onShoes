const epcTds = require('epc-tds');
var epc = epcTds.valueOf("303246280B066F0000989925"); // SGTIN-96

console.log("Barcode: " + epc.toBarcode()); // sgtin



