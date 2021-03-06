let connected = 0
bluetooth.onBluetoothConnected(function () {
    connected = 1
    starttime = input.runningTime()
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
})
let message_type = 0
let timestamp = 0
let starttime = 0
let value1 = 0
let value2 = 0
let value3 = 0
let value4 = 0

bluetooth.startUartService()
let message = pins.createBuffer(11);

function transmitData() {
    timestamp = input.runningTime() - starttime
    message.setNumber(NumberFormat.Int8LE, 0, message_type);
    message.setNumber(NumberFormat.Int32BE, 1, timestamp);
    message.setNumber(NumberFormat.Int16BE, 5, value1);
    message.setNumber(NumberFormat.Int16BE, 7, value2);
    message.setNumber(NumberFormat.Int16BE, 9, value3);
    bluetooth.uartWriteBuffer(message)
}
basic.forever(function () {
    if (connected == 1) {
        // message type 10 = accelerometer data
        message_type = 10
        value1 = input.acceleration(Dimension.X)
        value2 = input.acceleration(Dimension.Y)
        value3 = input.acceleration(Dimension.Z)
        transmitData()
    }
    basic.pause(100)
})
