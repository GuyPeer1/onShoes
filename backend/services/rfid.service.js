const HID = require('node-hid');
const vendorId = 1534;
const productId = 4112;

HID.devices().forEach((device) => {
  if (device.vendorId === vendorId && device.productId === productId) {
      const hidDevice = new HID.HID(device.path);
    hidDevice.on("attach", () => {
      console.log("RFID device attached.");
      hidDevice.on("data", (data) => {
        console.log("RFID data received:", data);
        // Handle the data that comes in from the device.
        // Send the data 303246280b05bc0000000101to your frontend using a WebSocket or a similar mechanism.
      })
    })
  }
})
