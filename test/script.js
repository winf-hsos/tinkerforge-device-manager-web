import * as dm from '../index.js';

var nfc;

async function run() {
    var devices = await tf.initDevices();
    console.dir(devices);

    nfc = devices.getDeviceByIdentifier(286);
    console.dir(nfc);

    nfc.scan(nfcRead, errorHandler);
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

