import { Wrapper } from './Wrapper.js';

class CO2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(Tinkerforge.BrickletCO2.CALLBACK_CO2_CONCENTRATION, this.co2ValueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setCO2ConcentrationCallbackPeriod(intervalInMs);
    }

    co2ValueChanged(value, err) {
        var values = [];
        var sensorId = this.uid + "_co2";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'co2',
            value: value
        })
        return super.valueChanged(values, err);
    }

}

export { CO2Wrapper };