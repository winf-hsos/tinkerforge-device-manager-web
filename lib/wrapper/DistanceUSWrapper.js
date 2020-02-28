import { Wrapper } from './Wrapper.js';

class DistanceUSWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(Tinkerforge.BrickletDistanceUS.CALLBACK_DISTANCE, this.distanceValueChanged.bind(this));
        this.setCallbackInterval(200);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setDistanceCallbackPeriod(intervalInMs);
    }

    distanceValueChanged(distance, err) {
        var values = [];
        var sensorId = this.uid + "_distance_us";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'distance',
            value: distance
        })
        return super.valueChanged(values, err);
    }

}

export { DistanceUSWrapper };