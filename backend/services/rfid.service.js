const { SerialPort } = require('serialport')
const  socketService  = require('./socket.service.js')

function readRFID() {
    const port = new SerialPort({
        path: '/COM6',
        baudRate: 9600
    })
    let buffer = Buffer.alloc(0)

    port.on('data', data => {
        buffer = Buffer.concat([buffer, data]);

        if (buffer.length >= 16) {
            const tag_id = buffer.slice(3, 15).toString('hex')
            console.log(tag_id);
            buffer = Buffer.alloc(0)

            // Emit the RFID code via socket
            socketService.emitTo({ type: 'rfid', data: tag_id })

            port.close(() => {
                console.log('Port closed')
                readRFID()
            })
        }
    })
}

readRFID()
