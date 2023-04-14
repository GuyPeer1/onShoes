
const usb = require('usb');

const vendorId = 4292
const productId = 60000

// Find the device with the vendor ID and product ID of your RFID reader
const device = usb.findByIds(vendorId, productId)

if (device) {
  console.log(device)
  device.open()

  // Claim the interface used by your RFID reader
  // const interfaceNum = 0
  // device.interface(interfaceNum).claim()

//   // Find the endpoint used by your RFID reader
//   const endpointIn = device.interface(interfaceNum).endpoint(0)

//   // Start listening for RFID events
//   endpointIn.on('data', data => {
//     console.log(`RFID data received: ${data}`);
//     // Handle the RFID data here
//   });

//   // Handle errors that occur while reading data from the endpoint
//   endpointIn.on('error', err => {
//     console.error('Error reading data from endpoint: ', err)
//   });

//   // Handle errors that occur while opening the device or claiming the interface
//   device.on('error', err => {
//     console.error('Error opening device or claiming interface: ', err)
//   })
// } else {
//   console.error('RFID reader not found')
}
