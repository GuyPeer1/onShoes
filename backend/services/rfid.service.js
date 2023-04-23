const { SerialPort } = require('serialport');

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

            port.close(() => {
                console.log('Port closed')
                readRFID()
            })
        }
    })
}

readRFID()
