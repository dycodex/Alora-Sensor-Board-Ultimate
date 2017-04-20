'use strict';

const BME280 = require('bme280-sensor');
const opts = {
  i2cBusNo: 1,
  i2cAddress: BME280.BME280_DEFAULT_I2C_ADDRESS(),
};

const bme280 = new BME280(opts);

bme280
  .init()
  .then(() => {
    return bme280.readSensorData();
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((err) => { console.error('Error sensor:', err); });
