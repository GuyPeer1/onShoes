// const { SerialPort } = require('serialport')
// const socketService = require('./socket.service.js')

// // const FIRST_PORT_PATH = process.env.FIRST_PORT_PATH || (process.platform === 'win32' ? '/COM6' : '/dev/ttyUSB0')
// // const SECOND_PORT_PATH = process.env.SECOND_PORT_PATH || (process.platform === 'win32' ? '/COM8' : '/dev/ttyUSB1')
// //this is the manufatrer name of our rfid reader
// const MANUFACTURER_NAME = 'Silicon Labs'

// //the following function will get the correct path of the rfid's will open its serial port using readRfid func
// getPortPath(MANUFACTURER_NAME)

// async function getPortPath(manufacturerName) {
//     const ports = await SerialPort.list()
//     const filteredPorts = ports.filter(port => port.manufacturer === manufacturerName)
//     if (filteredPorts.length === 0) {
//         throw new Error(`No ports found with manufacturer name ${manufacturerName}`)
//     }
//     const FIRST_PORT_PATH = filteredPorts[0].path
//     const SECOND_PORT_PATH = filteredPorts[1].path
//     readRfid(FIRST_PORT_PATH, 'rfid-first')
//     readRfid(SECOND_PORT_PATH, 'rfid-second')
// }

// function readRfid(path, eventType) {
//     const port = new SerialPort({
//         path,
//         baudRate: 9600
//     });
//     let buffer = Buffer.alloc(0)

//     port.on('data', data => {
//         buffer = Buffer.concat([buffer, data])

//         if (buffer.length >= 16) {
//             const tag_id = buffer.slice(3, 15).toString('hex')
//             console.log(tag_id)
//             buffer = Buffer.alloc(0)
//             console.log(eventType, tag_id)

//             // Emit the RFID code via socket
//             socketService.emitTo({ type: eventType, data: tag_id })

//             port.close(() => {
//                 console.log(`Port ${path} closed`)
//                 readRfid(path, eventType)
//             })
//         }
//     })
// }

