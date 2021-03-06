Alora Sensor Board Ultimate
===========================

DycodeX's most complete sensor board among another Alora Sensor Board.

![Alora Sensor Board](https://github.com/dycodex/Alora-Sensor-Board-Ultimate/raw/master/assets/alora.jpg)

![Alora Sensor Board](https://github.com/dycodex/Alora-Sensor-Board-Ultimate/raw/master/assets/alora2.jpg)

# Pin Out

![Alora Sensor Board pin out](https://github.com/dycodex/Alora-Sensor-Board-Ultimate/raw/master/assets/alora-pinout.jpg)

# Activating Alora Sensor Board

Before using Alora Sensor Board, you need to activate it by executing the `activate-alora`.

You're free to clone this repo or download the zipped file. Then, move to the directory (`Alora-Sensor-Board-Ultimate` by default).

```sh
cd Alora-Sensor-Board-Ultimate
./activate-alora
```

# I2C Devices Address

All devices listed below is accessible via I2C. You must enable I2C interface before using them.

Address|I2C device
-------|------
0x1D, 0x6B | LSM9DS0
0x20 | SX1508
0x29 | TSL2561
0x2F | MCP4462
0x33 | MAX1160
0x44 | SHT31
0x5A | iAQ-Core
0x77 | BME285

# Example Code

All examples code are available under examples directory on this repository.

**Note**: You must have node.js v6 or newer and python3 installed to run the code.
