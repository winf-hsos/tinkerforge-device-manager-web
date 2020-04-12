var light;
var devices;

tf.initDevices(initDone);

function initDone(connectedDevices) {
    devices = connectedDevices;
    console.dir(devices);

    light = devices.getDeviceByIdentifier(259);
    light.registerListener(lightChanged);

}

function lightChanged(val) {
    let sensorValue = val.getValue();
    console.dir(sensorValue);
}

function nfcRead(val) {
    console.dir(val);
    setTimeout(() => { nfc.scan(nfcRead, errorHandler); }, 1000);
}

function errorHandler(err) {
    console.error(err);
    nfc.scan(nfcRead, errorHandler);
}

//var btn = document.querySelector("button").addEventListener("click", run);

