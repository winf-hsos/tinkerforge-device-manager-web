import { Wrapper } from './Wrapper.js';

class OutdoorWeatherWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(Tinkerforge.BrickletOutdoorWeather.CALLBACK_STATION_DATA, this.stationDataChanged.bind(this));
        this.device.on(Tinkerforge.BrickletOutdoorWeather.CALLBACK_SENSOR_DATA, this.sensorDataChanged.bind(this));
        this.device.setStationCallbackConfiguration(true);
        this.device.setSensorCallbackConfiguration(true);

    }

    stationDataChanged(identifier, temperature, humidity, windSpeed, gustSpeed, rain,
        windDirection, batteryLow) {

        var values = [];
        var sensorId = this.uid + "_outdoor_station_" + identifier;

        values.push({
            sensor_id: sensorId,
            station_id: identifier,
            type: 'temperature',
            value: temperature
        })

        values.push({
            sensor_id: sensorId,
            station_id: identifier,
            type: 'humidity',
            value: humidity
        })

        values.push({
            sensor_id: sensorId,
            station_id: identifier,
            type: 'windSpeed',
            value: windSpeed
        })

        values.push({
            sensor_id: sensorId,
            station_id: identifier,
            type: 'gustSpeed',
            value: gustSpeed
        })

        values.push({
            sensor_id: sensorId,
            station_id: identifier,
            type: 'rain',
            value: rain
        })

        values.push({
            sensor_id: sensorId,
            station_id: identifier,
            type: 'windDirection',
            value: windDirection
        })

        values.push({
            sensor_id: sensorId,
            station_id: identifier,
            type: 'batteryLow',
            value: batteryLow
        })

        return super.valueChanged(values);
    }

    sensorDataChanged(identifier, temperature, humidity) {

        var values = [];
        var sensorId = this.uid + "_outdoor_sensor_" + identifier;

        values.push({
            sensor_id: sensorId,
            station_id: identifier,
            type: 'temperature',
            value: temperature
        })

        values.push({
            sensor_id: sensorId,
            station_id: identifier,
            type: 'humidity',
            value: humidity
        })

        return super.valueChanged(values);
    }
}

export { OutdoorWeatherWrapper };