var light;
var devices;
var nfc;
var motionDetector;
var poti;

tf.initDevices(initDone);

function initDone(connectedDevices) {
    devices = connectedDevices;
    console.dir(devices);

    /*
    light = devices.getDeviceByIdentifier(259);
    light.registerListener(lightChanged);
    */

    /*
    nfc = devices.getDeviceByIdentifier(286);
    nfc.scan(readingDone, readingFailed);
    */

    /*
    oledDisplay = devices.getDeviceByIdentifier(263);
    oledDisplay.clearDisplay();
    
    oledDisplay.write(1,0, "Hallo");
    oledDisplay.write(5,0, "Hallo");

    motionDetector = devices.getDeviceByIdentifier(292);
    motionDetector.registerListener(motionDetected);
    */

    /*
    poti = devices.getDeviceByIdentifier(267);
    poti.setPosition(100);
    poti.registerListener(potiChanged);
    */
}

function potiChanged(val) {
    console.dir(val);
}

function motionDetected(val) {
    var motion = val.getValue();
    console.dir(motion);
}

function lightChanged(val) {
    let sensorValue = val.getValue();
    console.dir(sensorValue);
}

function readingDone(val) {
    console.dir(val);
    setTimeout(() => { nfc.scan(readingDone, readingFailed); }, 1000);
}

function readingFailed(error) {
    console.err(error);
    setTimeout(() => { nfc.scan(readingDone, readingFailed); }, 1000);
}

function errorHandler(err) {
    console.error(err);
    nfc.scan(nfcRead, errorHandler);
}