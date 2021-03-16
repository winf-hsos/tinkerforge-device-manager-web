class Wrapper {
    constructor(device, uid, deviceIdentifier, deviceName) {
        //console.log(uid + "/" + deviceIdentifier);

        this.device = device;
        this.uid = uid;
        this.deviceIdentifier = deviceIdentifier;
        this.deviceName = deviceName;

        this.listener = [];
        this.logger = [];
    }

    getUID() {
        return this.uid;
    }

    getDeviceIdentifier() {
        return this.deviceIdentifier;
    }

    getName() {
        return this.deviceName;
    }

    registerLogger(logger) {
        this.logger.push(logger);
    }

    registerListener(callback) {
        this.listener.push(callback);
    }

    /* Alternative, shorter form */
    listen(callback) {
        this.listener.push(callback);
    }

    stopListen(callback) {
        this.removeListener(callback);
    }

    removeListener(callback) {
        var deleteIndex = -1;
        this.listener.forEach((listener, index) => {
            if (listener === callback)
                deleteIndex = index;
        });

        this.listener.splice(deleteIndex, 1);
    }

    valueChanged(values, err) {
        if (err)
            console.log(err)
        else {
            var now = Date.now();
            var valueObj = {
                uid: this.uid,
                deviceIdentifier: this.deviceIdentifier,
                time_formatted: moment(now).format('YYYY-MM-DD HH:mm:ss:SSS'),
                timestamp: now,
                values: values
            };


            // Add getter function for values
            // values { sensor_id, station_id: null, type: 'temperature',  value: spectrumChunkData }
            valueObj.getValue = (type = "") => {

                if (values.length == 0) {
                    console.error("No values found")
                    return -1;
                }

                // If there is only one value and no argument for type
                if (type == "" && values.length == 1) {
                    //return { type: values[0].type, value: values[0].value };
                    return values[0].value;
                }
                else if (type == "" && values.length > 1) {
                    console.warn("More than one type of value found and no type specified. Returning only the first: " + values[0].type);
                    //return { type: values[0].type, value: values[0].value };
                    return values[0].value;
                }
                else if (type !== "") {
                    for (var i = 0; i < values.length; i++) {
                        if (values[i].type == type)
                            //return { type: values[i].type, value: values[i].value };
                            return values[i].value;
                    }
                }

                console.error("Value not found");
                return -1;
            }

            this.listener.forEach((listener) => {
                listener(valueObj);
            });

            this.logger.forEach((logger) => {
                logger.info(this._formatValue(valueObj));
            });

        }
    }

    // TODO: Broken, needs fix
    _formatValue(valueObj) {
        var time = moment(new Date().getTime());
        var logEntry = valueObj.time + ";" + valueObj.uid + ";" + valueObj.deviceIdentifier + ";" + valueObj.value;
        return logEntry;
    }

}

export { Wrapper };