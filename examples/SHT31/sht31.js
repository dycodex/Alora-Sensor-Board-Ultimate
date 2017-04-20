'use strict';

const SHT31 = require(`./sht31-node`);

const sht31 = new SHT31(0x44, 1);

sht31
  .init()
  .then(() => sht31.readSensorData())
  .then(console.log);
