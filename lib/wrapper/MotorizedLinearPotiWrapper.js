import { Wrapper } from './Wrapper.js';

class MotorizedLineraPotiWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(Tinkerforge.BrickletMotorizedLinearPoti.CALLBACK_POSITION, this.positionChanged.bind(this))

        // Set some sensible default configuration
        this.device.setPositionCallbackConfiguration(50, true, 'x', 0, 0);

        // Callback for when the position was reached
        this.device.on(Tinkerforge.BrickletMotorizedLinearPoti.CALLBACK_POSITION_REACHED, this.positionReached.bind(this));
    }

    positionChanged(position) {
        var values = [];
        var sensorId = this.uid + "_position";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'position',
            value: position
        })

        return super.valueChanged(values);
    }

    positionReached(position) {

        var values = [];
        var sensorId = this.uid + "_position_reached";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'position_reached',
            value: position
        })

        return super.valueChanged(values);

    }

    setPosition(position) {
        this.device.setMotorPosition(position, Tinkerforge.BrickletMotorizedLinearPoti.DRIVE_MODE_SMOOTH, false);
    }
}

export { MotorizedLineraPotiWrapper }