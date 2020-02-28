import { Wrapper } from './Wrapper.js';

class AmbientLightV2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(Tinkerforge.BrickletAmbientLightV2.CALLBACK_ILLUMINANCE, this.ambientLightValueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setIlluminanceCallbackPeriod(intervalInMs);
    }

    ambientLightValueChanged(ambientLight, err) {

        var values = [];
        var sensorId = this.uid + "_ambientlight";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'ambient_light',
            value: ambientLight
        })

        return super.valueChanged(values, err);
    }

}

export { AmbientLightV2Wrapper };