import * as dm from '../index.js';

var light;

async function run() {
    var devices = await tf.initDevices();
    console.dir(devices);

    light = devices.getDeviceByIdentifier(250);
    light.registerListener(lightChanged);
    
}

function lightChanged(val) {
    let sensorValue = val.getValue("y");

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

var btn = document.querySelector("button").addEventListener("click", run);

