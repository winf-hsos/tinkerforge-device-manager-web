import { Wrapper } from './Wrapper.js';

class NFCWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        this.scanCallback;
    }

    scan(callback, errorCallback) {
        this.scanCallback = callback;
        this.scanErrorCallback = errorCallback;
        this.device.on(Tinkerforge.BrickletNFC.CALLBACK_READER_STATE_CHANGED, this.readerStateChanged.bind(this));
        this.device.setMode(Tinkerforge.BrickletNFC.MODE_READER);
    }

    setIdle() {
        return this.device.setMode(Tinkerforge.BrickletNFC.MODE_STOP);
    }

    getMode() {
        return this.device.getMode();
    }

    readerStateChanged(state, idle) {

        var _this = this;

        if (state == Tinkerforge.BrickletNFC.READER_STATE_IDLE) {
            this.device.readerRequestTagID();
        }
        else if (state == Tinkerforge.BrickletNFC.READER_STATE_REQUEST_TAG_ID_READY) {
            this.device.readerGetTagID(
                function (tagType, tagIdLength, tagIdData) {

                    if (tagType != Tinkerforge.BrickletNFC.TAG_TYPE_TYPE2) {
                        _this.scanErrorCallback(-1, 'Tag is not type-2');
                        return;
                    }

                    // Request page 5
                    _this.device.readerRequestPage(5, 4);
                },
                function (error) {
                    _this.scanErrorCallback(-1, error);
                }
            );
        }
        else if (state == Tinkerforge.BrickletNFC.READER_STATE_REQUEST_TAG_ID_ERROR) {
            // No tag present, keep scanning
            this.device.readerRequestTagID();
        }
        else if (state == Tinkerforge.BrickletNFC.READER_STATE_REQUEST_PAGE_READY) {
            _this.device.readerReadPage(
                function (page) {

                    _this.scanCallback({ id: page[0].toString(16), type: page[1].toString(16) });

                    //this.device.readerWritePage(1, page);

                },
                function (error) {
                    _this.scanErrorCallback(-1, error);
                    //console.log('Error: ' + error);
                }
            );
        }
        else if (state == Tinkerforge.BrickletNFC.READER_STATE_WRITE_PAGE_READY) {
            console.log('Write page ready');
        }
        else if (state == Tinkerforge.BrickletNFC.READER_STATE_REQUEST_PAGE_ERROR) {
            _this.scanErrorCallback(Tinkerforge.BrickletNFC.READER_STATE_REQUEST_PAGE_ERROR, 'Request page error');

        }
        else if (state == Tinkerforge.BrickletNFC.READER_STATE_WRITE_PAGE_ERROR) {
            _this.scanErrorCallback(Tinkerforge.BrickletNFC.READER_STATE_WRITE_PAGE_ERROR, 'Write page error');
        }
    }
}

export { NFCWrapper };