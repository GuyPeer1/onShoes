const HID = require('node-hid');

const vendorId = 1534;
const productId = 4112;
const socketService = require('../services/socket.service.js')

HID.devices().forEach((device) => {
    if (device.vendorId === vendorId && device.productId === productId) {
      const hidDevice = new HID.HID(device.path);
      console.log('RFID device connected.');
  
      hidDevice.on('data', (data) => {
        const tagCode = data.toString('utf8').trim();
        console.log('Scanned RFID code:', tagCode);
        // send the scanned code to the frontend using socketService.emit()
        socketService.emit('rfid-scanned', { code: tagCode });
      });
  
      hidDevice.on('error', (error) => {
        console.error('RFID device error:', error);
      });
  
      process.on('exit', () => {
        hidDevice.close();
        console.log('RFID device disconnected.');
      });
    }
  });