# Tinkerforge Device Manager (Web Version)

A web JS library to make connecting to and accessing Tinkerforge devices easier. Created at the University of Applied Sciences in Osnabrueck.

# Usage

You can manually include all necessary libraries to use the TDM in your web project. If you want to do that, copy the 3 lines of code below and paste them right before the closing </body>-tag in your HTML file.

```html
<script src="https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js" type="text/javascript"></script>
<script src="https://cdn.jsdelivr.net/gh/winf-hsos/tinkerforge-device-manager-web/lib/Tinkerforge.js"></script>
<script src="https://cdn.jsdelivr.net/gh/winf-hsos/tinkerforge-device-manager-web/index.js" type="module"></script>
```

# Supported Devices
Currently supported Tinkerforge devices:

- [Accelerometer Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Accelerometer.html)
- [Air Quality Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Air_Quality.html)
- [Ambient Light 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Ambient_Light_V2.html)
- [Barometer 1.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Barometer.html#barometer-bricklet)
- [Barometer 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Barometer_V2.html)
- [C02 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/CO2.html)
- [Dust Detector Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Dust_Detector.html)
- [Distance IR Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Distance_IR.html)
- [Distance US Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Distance_US.html)
- [GPS 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/GPS_V2.html)
- [Humidity 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Humidity_V2.html)
- [LCD 128x64 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/LCD_128x64.html)
- [Motion Detector 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Motion_Detector_V2.html)
- [NFC Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/NFC.html)
- [OLED 128x64 Display Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/OLED_128x64.html)
- [Outdoor Weather Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Outdoor_Weather.html)
- [Piezo Speaker Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Piezo_Speaker.html)
- [RGB LED Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/RGB_LED.html)
- [RGB LED Button Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/RGB_LED_Button.html)
- [Sound Intensity Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Sound_Intensity.html)
- [Sound Pressure Level Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Sound_Pressure_Level.html)
- [Thermal Imaging Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Thermal_Imaging.html)
- [UV Light 1.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/UV_Light.html)
- [UV Light 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/UV_Light_V2.html)