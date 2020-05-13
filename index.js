import { deviceManager } from './lib/deviceManager.js';

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
async function initDevices(finishedCallback = null) {
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
        }, 500);
    });

    function callback(device) {
        devices.push(device);
    }
}

function setLogFunction(logFunction) {
    deviceManager.setLogFunction(logFunction);
}

window.tf = {}

window.tf.setLogFunction = setLogFunction;

// For simple access via one function call with await
window.tf.initDevices = initDevices;

// To access devices via callback function
window.tf.setPort = setPort;
window.tf.setHost = setHost;
window.tf.initialize = initialize;
window.tf.setConnectCallback = setConnectCallback;

// For all cases, get access to the whole manager
window.tf.deviceManager = deviceManager;

