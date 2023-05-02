const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const socketService = require('./socket.service.js')

//this is the manufatrer name of our rfid reader
const MANUFACTURER_NAME = 'Prolific'

//the following function will get the correct path of the rfid's will open its serial port using readRfid func
getPortPath(MANUFACTURER_NAME)

async function getPortPath(manufacturerName) {
    const ports = await SerialPort.list()
    const filteredPorts = ports.filter(port => port.manufacturer === manufacturerName)
    if (filteredPorts.length === 0) {
        throw new Error(`No ports found with manufacturer name ${manufacturerName}`)
    }
    const PORT_PATH = filteredPorts[0].path
    readNexmosphere(PORT_PATH, 'nexmosphere')
}

function readNexmosphere(path, eventType) {
    const port = new SerialPort({
        path,
        baudRate: 115200,
    });

    const parser = port.pipe(new ReadlineParser())
    parser.on('data', (data) => {
        console.log('data', data)
        if (data.includes("Dz=AB") || data.includes("Dz=XX")) {
            console.log('person left')
            socketService.emitTo({ type: 'person-left' })
        }
        else {
            const numberPattern = /Dz=(\d+)/
            const match = data.match(numberPattern);
            if (match) {
                const number = match[1]
                console.log(`${data} contains ${number}`)
                socketService.emitTo({ type: 'person-join' })

            } else {
                console.log(`${data} does not does not indicate about person`)
            }

        }
    })
}