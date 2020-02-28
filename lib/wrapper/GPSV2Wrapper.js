import { Wrapper } from './Wrapper.js';

class GPSV2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(Tinkerforge.BrickletGPSV2.CALLBACK_COORDINATES, this.coordinatesChanged.bind(this));
        this.setCallbackInterval(1000);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setCoordinatesCallbackPeriod(intervalInMs);
    }

    coordinatesChanged(latitude, ns, longitude, ew) {

        var values = [];
        var sensorId = this.uid + "_gps";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'latitude',
            value: latitude / 1000000.0
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'longitude',
            value: longitude / 1000000.0
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'ns',
            value: ns
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'ew',
            value: ew
        })
        return super.valueChanged(values, err);
    }

}

export { GPSV2Wrapper };