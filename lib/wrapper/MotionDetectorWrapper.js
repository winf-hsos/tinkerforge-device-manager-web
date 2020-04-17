import { Wrapper } from './Wrapper.js';

class MotionDetectorWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(Tinkerforge.BrickletMotionDetector.CALLBACK_MOTION_DETECTED, this.motionDetected.bind(this));
        this.device.on(Tinkerforge.BrickletMotionDetector.CALLBACK_DETECTION_CYCLE_ENDED, this.motionDetectedOff.bind(this));
    }

    motionDetected() {

        var values = [];
        var sensorId = this.uid + "_motion_detector";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'motion_detected',
            value: 1
        })
        return super.valueChanged(values);
    }

    motionDetectedOff() {
        var values = [];
        var sensorId = this.uid + "_motion_detector";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'detection_cycle_ended',
            value: 1
        })
        return super.valueChanged(values);
    }
}

export { MotionDetectorWrapper };