import { deviceManager } from './lib/deviceManager.js';
//import Tinkerforge from 'tinkerforge'

var connectCallback;
var ipcon;

// Default values for host and port
var host = "localhost";
var port = 4280;

function setPort(newPort) {
    port = newPort;
}

function setHost(newHost) {
    host = newHost;
}

/* For getting devices via callback function */
function initialize() {
    deviceManager.log("Waiting for devices to connect...");

    ipcon = new Tinkerforge.IPConnection();
    deviceManager.setIPConnection(ipcon);
    ipcon.connect(host, port);

    ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
        function (connectReason) {
            ipcon.enumerate();
        }
    );

    ipcon.on(Tinkerforge.IPConnection.CALLBACK_ENUMERATE, _enumerationCallback);
}

var setConnectCallback = function (callback) {
    connectCallback = callback;
}

/* Enumeration Types: 0 - Available, 1 - Connected, 2 - Offline (nur USB) */
function _enumerationCallback(uid, connectedUid, position, hardwareVersion, firmwareVersion,
    deviceIdentifier, enumerationType) {

    if (enumerationType == Tinkerforge.IPConnection.ENUMERATION_TYPE_AVAILABLE) {
        var device = deviceManager.add(uid, deviceIdentifier);
        if (typeof connectCallback !== "undefined")
            connectCallback(device);
    }
    else if (enumerationType == Tinkerforge.IPConnection.ENUMERATION_TYPE_CONNECTED) {
        var device = deviceManager.addAgain(uid, deviceIdentifier);
        if (typeof connectCallback !== "undefined")
            connectCallback(device);
    }
    else {
        deviceManager.remove(uid);
    }
}

/* Simplified access to devices using a timeout and no callback function */
async function initDevices(finishedCallback = null, timeOutMs = 750) {
    var devices = [];

    // Returns the first device with that identifier
    devices.getDeviceByIdentifier = (identifier) => {

        var result;

        devices.forEach((d) => {

            if (d.deviceIdentifier == identifier) {
                result = d;
            }
        })

        return result;
    };

    // Returns the first device with that uid
    devices.getDeviceByUid = (uid) => {

        var result;

        devices.forEach((d) => {

            if (d.uid == uid) {
                result = d;
            }
        })

        return result;
    };

    return new Promise((resolve, reject) => {
        setConnectCallback(callback);
        initialize();

        setTimeout(() => {
            // Call optional callback function
            if (finishedCallback !== null) {
                finishedCallback(devices);
            }
            resolve(devices);
        }, timeOutMs);
    });

    function callback(device) {
        devices.push(device);
    }
}

function setLogFunction(logFunction) {
    deviceManager.setLogFunction(logFunction);
}

let tf = {};
tf.setLogFunction = setLogFunction;
tf.initDevices = initDevices;
tf.setPort = setPort;
tf.initialize = initialize;
tf.setConnectCallback = setConnectCallback;
tf.deviceManager = deviceManager;

if (typeof window !== 'undefined') {
    window.tf = tf;
    console.log("Successfully loaded Tinkerforge Device Manager V1.0");
}

