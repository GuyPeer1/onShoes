const { SerialPort } = require('serialport')
const socketService = require('./socket.service.js')

function readFirstRfid() {
    const firstPort = new SerialPort({
        path: '/COM6',
        baudRate: 9600
    })
    let buffer = Buffer.alloc(0)

    firstPort.on('data', data => {
        buffer = Buffer.concat([buffer, data]);

        if (buffer.length >= 16) {
            const tag_id = buffer.slice(3, 15).toString('hex')
            console.log(tag_id);
            buffer = Buffer.alloc(0)

            // Emit the RFID code via socket
            socketService.emitTo({ type: 'rfid-first', data: tag_id })
            console.log('first',tag_id)
            firstPort.close(() => {
                console.log('First Port closed')
                readFirstRfid()
            })
        }
    })
}

function readSecondRfid() {
    const secondPort = new SerialPort({
        path: '/COM8',
        baudRate: 9600
    })
    let buffer = Buffer.alloc(0)

    secondPort.on('data', data => {
        buffer = Buffer.concat([buffer, data]);

        if (buffer.length >= 16) {
            const tag_id = buffer.slice(3, 15).toString('hex')
            console.log(tag_id);
            buffer = Buffer.alloc(0)
            console.log('second',tag_id)

            // Emit the RFID code via socket
            socketService.emitTo({ type: 'rfid-second', data: tag_id })

            secondPort.close(() => {
                console.log('Second Port closed')
                readSecondRfid()
            })
        }
    })
}
readFirstRfid()
readSecondRfid()

