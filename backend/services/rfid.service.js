const { SerialPort } = require('serialport')

const serialport = new SerialPort({ path: '/COM4', baudRate: 9600 })
serialport.on('open', () => {
  console.log('Serial port opened')
})

// serialport.on('data', data => {
//   console.log(`Data received: ${data}`);
//   // Handle the data received here
// })

// serialport.on('error', err => {
//   console.error('Serial port error: ', err);
// })

