/* Load the wrapper classes */
import { Wrapper } from './wrapper/Wrapper.js';
import { CO2V2Wrapper } from  './wrapper/CO2V2Wrapper.js';

import { AccelerometerWrapper } from './wrapper/AccelerometerWrapper.js';
import { AirQualityWrapper } from './wrapper/AirQualityWrapper.js';
import { AmbientLightV2Wrapper } from './wrapper/AmbientLightV2Wrapper.js';
import { BarometerWrapper } from './wrapper/BarometerWrapper.js';
import { BarometerV2Wrapper } from './wrapper/BarometerV2Wrapper.js';
import { CO2Wrapper } from './wrapper/CO2Wrapper.js';

import { DustDetectorWrapper } from './wrapper/DustDetectorWrapper.js';
import { DistanceIRWrapper } from './wrapper/DistanceIRWrapper.js';
import { DistanceUSWrapper } from './wrapper/DistanceUSWrapper.js';
import { DistanceUSV2Wrapper } from './wrapper/DistanceUSV2Wrapper.js';
import { GPSV2Wrapper } from './wrapper/GPSV2Wrapper.js';
import { HumidityV2Wrapper } from './wrapper/HumidityV2Wrapper.js';
import { LCD128x64DisplayWrapper } from './wrapper/LCD128x64DisplayWrapper.js';
import { MotionDetectorV2Wrapper } from './wrapper/MotionDetectorV2Wrapper.js';
import { NFCWrapper } from './wrapper/NFCWrapper.js';
import { OLEDDisplayWrapper } from './wrapper/OLEDDisplayWrapper.js';
import { OutdoorWeatherWrapper } from './wrapper/OutdoorWeatherWrapper.js';
import { PiezoSpeakerWrapper } from './wrapper/PiezoSpeakerWrapper.js';
import { RGBLEDButtonWrapper } from './wrapper/RGBLEDButtonWrapper.js';
import { RGBLEDWrapper } from './wrapper/RGBLEDWrapper.js';
import { SoundIntensityWrapper } from './wrapper/SoundIntensityWrapper.js';
import { SoundPressureWrapper } from './wrapper/SoundPressureWrapper.js';
import { ThermalImagingWrapper } from './wrapper/ThermalImagingWrapper.js';
import { UVLightWrapper } from './wrapper/UVLightWrapper.js';
import { UVLightV2Wrapper } from './wrapper/UVLightV2Wrapper.js';

var _ipcon;
var _devices = new Map();

var deviceManager = {}

deviceManager.setIPConnection = function (ipcon) {
    _ipcon = ipcon;
}

deviceManager.add = function (uid, deviceIdentifier) {
    var device = _wrapDevice(uid, deviceIdentifier);
    if (typeof device !== "undefined") {
        console.log("Found device >" + device.getName() + "< (UID: " + device.getUID() + "/ DID: " + device.getDeviceIdentifier() + ")");
        _devices.set(uid, device);
    }
    return device;
}

deviceManager.addAgain = function (uid, deviceIdentifier) {
    var device = _wrapDevice(uid, deviceIdentifier);
    if (typeof device !== "undefined") {
        console.log("Re-connected device >" + device.getName() + "< (UID: " + device.getUID() + "/ DID: " + device.getDeviceIdentifier() + ")");
        _devices.set(uid, device);
    }
    return device;
}

deviceManager.remove = function (uid) {

    if (_devices.has(uid)) {
        var device = _devices.get(uid);
        console.log("Lost device >" + device.getName() + "< (UID: " + device.getUID() + "/ DID: " + device.getDeviceIdentifier() + ")");
        _devices.delete(uid);
    }
}


function _wrapDevice(uid, deviceIdentifier) {

    var deviceWrapper;
    var deviceName;
    var device;

    switch (deviceIdentifier) {
        // Master Brick
        case 13:
            deviceName = "Master Brick";
            device = new Tinkerforge.BrickMaster(uid, _ipcon);
            // TODO: Implement and replace with specific wrapper for Master Brick
            deviceWrapper = new Wrapper(device, uid, deviceIdentifier, deviceName);
            break;

        case 25:
            deviceName = "Distance IR Bricklet";
            device = new Tinkerforge.BrickletDistanceIR(uid, _ipcon);
            deviceWrapper = new DistanceIRWrapper(device, uid, deviceIdentifier, deviceName);
            break;

        case 221:
            deviceName = "Barometer Bricklet";
            device = new Tinkerforge.BrickletBarometer(uid, _ipcon);
            deviceWrapper = new BarometerWrapper(device, uid, deviceIdentifier, deviceName);
            break;

        case 229:
            deviceName = "Distance US  Bricklet";
            device = new Tinkerforge.BrickletDistanceUS(uid, _ipcon);
            deviceWrapper = new DistanceUSWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 238:
            deviceName = "Sound Intensity Bricklet";
            device = new Tinkerforge.BrickletSoundIntensity(uid, _ipcon);
            deviceWrapper = new SoundIntensityWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 242:
            deviceName = "Piezo Speaker Bricklet";
            device = new Tinkerforge.BrickletPiezoSpeaker(uid, _ipcon);
            deviceWrapper = new PiezoSpeakerWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 250:
            deviceName = "Accelerometer Bricklet";
            device = new Tinkerforge.BrickletAccelerometer(uid, _ipcon);
            deviceWrapper = new AccelerometerWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 259:
            deviceName = "Ambient Light 2.0 Bricklet";
            device = new Tinkerforge.BrickletAmbientLightV2(uid, _ipcon);
            deviceWrapper = new AmbientLightV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 260:
            deviceName = Tinkerforge.BrickletDustDetector.DEVICE_DISPLAY_NAME;
            device = new Tinkerforge.BrickletDustDetector(uid, _ipcon);
            deviceWrapper = new DustDetectorWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 262:
            deviceName = "CO2 Bricklet";
            device = new Tinkerforge.BrickletCO2(uid, _ipcon);
            deviceWrapper = new CO2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 263:
            deviceName = "OLED 128x64 Display Bricklet";
            device = new Tinkerforge.BrickletOLED128x64(uid, _ipcon);
            deviceWrapper = new OLEDDisplayWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 265:
            deviceName = "UV Light Bricklet";
            device = new Tinkerforge.BrickletUVLight(uid, _ipcon);
            deviceWrapper = new UVLightWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 271:
            deviceName = "RGB LED Bricklet";
            device = new Tinkerforge.BrickletRGBLED(uid, _ipcon);
            deviceWrapper = new RGBLEDWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 276:
            deviceName = "GPS Bricklet";
            device = new Tinkerforge.BrickletGPSV2(uid, _ipcon);
            deviceWrapper = new GPSV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 278:
            deviceName = Tinkerforge.BrickletThermalImaging.DEVICE_DISPLAY_NAME;
            device = new Tinkerforge.BrickletThermalImaging(uid, _ipcon);
            deviceWrapper = new ThermalImagingWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 282:
            deviceName = "RGB Button Bricklet";
            device = new Tinkerforge.BrickletRGBLEDButton(uid, _ipcon);
            deviceWrapper = new RGBLEDButtonWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 283:
            deviceName = "Humidity 2.0 Bricklet";
            device = new Tinkerforge.BrickletHumidityV2(uid, _ipcon);
            deviceWrapper = new HumidityV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 286:
            deviceName = "NFC Bricklet";
            device = new Tinkerforge.BrickletNFC(uid, _ipcon);
            deviceWrapper = new NFCWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 288:
            deviceName = "Outdoor Weather Bricklet";
            device = new Tinkerforge.BrickletOutdoorWeather(uid, _ipcon);
            deviceWrapper = new OutdoorWeatherWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 290:
            deviceName = Tinkerforge.BrickletSoundPressureLevel.DEVICE_DISPLAY_NAME;
            device = new Tinkerforge.BrickletSoundPressureLevel(uid, _ipcon);
            deviceWrapper = new SoundPressureWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 292:
            deviceName = Tinkerforge.BrickletMotionDetectorV2.DEVICE_DISPLAY_NAME;
            device = new Tinkerforge.BrickletMotionDetectorV2(uid, _ipcon);
            deviceWrapper = new MotionDetectorV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 297:
            deviceName = Tinkerforge.BrickletAirQuality.DEVICE_DISPLAY_NAME;
            device = new Tinkerforge.BrickletAirQuality(uid, _ipcon);
            deviceWrapper = new AirQualityWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 298:
            deviceName = Tinkerforge.BrickletLCD128x64.DEVICE_DISPLAY_NAME;
            device = new Tinkerforge.BrickletLCD128x64(uid, _ipcon);
            deviceWrapper = new LCD128x64DisplayWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 299:
            deviceName = Tinkerforge.BrickletDistanceUSV2.DEVICE_DISPLAY_NAME;
            device = new Tinkerforge.BrickletDistanceUSV2(uid, _ipcon);
            deviceWrapper = new DistanceUSV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 2117:
            deviceName = Tinkerforge.BrickletBarometerV2.DEVICE_DISPLAY_NAME;
            device = new Tinkerforge.BrickletBarometerV2(uid, _ipcon);
            deviceWrapper = new BarometerV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 2118:
            deviceName = Tinkerforge.BrickletUVLightV2.DEVICE_DISPLAY_NAME;
            device = new Tinkerforge.BrickletUVLightV2(uid, _ipcon);
            deviceWrapper = new UVLightV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 2147:
            deviceName = Tinkerforge.BrickletCO2V2.DEVICE_DISPLAY_NAME;
            device = new Tinkerforge.BrickletCO2V2(uid, _ipcon);
            deviceWrapper = new CO2V2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        default:
            deviceWrapper = new Wrapper(null, uid, deviceIdentifier, "Unknown");
            console.log(chalk.yellow("Device with device ID >" + deviceIdentifier + "< is not supported yet."));
            break;
    }

    return deviceWrapper;
}

export { deviceManager }