import { Wrapper } from './Wrapper.js';

class DustDetectorWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(Tinkerforge.BrickletDustDetector.CALLBACK_DUST_DENSITY, this.dustValueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setDustDensityCallbackPeriod(intervalInMs);
    }

    dustValueChanged(dust, err) {
        var values = [];
        var sensorId = this.uid + "_dust_detector";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'dust',
            value: dust
        })
        return super.valueChanged(values, err);
    }

}

export { DustDetectorWrapper };