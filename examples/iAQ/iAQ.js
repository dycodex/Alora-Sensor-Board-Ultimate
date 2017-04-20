'use strict';

const i2c = require(`i2c`);
const Promise = require(`bluebird`);

class iAQ {
  constructor(bus = 1, address = 0x5a) {
    this.bus = bus;
    this.address = address;
    this.wire = Promise.promisifyAll(new i2c(address, {
      device: `/dev/i2c-${bus}`
    }));
  }

  readRegister() {
    return this.wire.readAsync(9);
  }

  getPrediction() {
    return this.readRegister()
      .then((data) => {
        const factor = Math.pow(2, 32) - 1;
        const result = (data[0] << 8) + data[1];
        return result & factor;
      });
  }

  getResistance() {
    return this.readRegister()
      .then((data) => {
        const factor = Math.pow(2, 16) - 1;
        let result = (data[3] << 24) & factor;
        result += (data[4] << 16) & factor;
        result += (data[5] << 8) & factor;
        result += data[6] & factor;

        return result;
      });
  }

  getTVOC() {
    return this.readRegister()
      .then((data) => {
        const factor = Math.pow(2, 32) - 1;
        let result = (data[7] << 8) & factor;
        result += (data[8]) & factor;

        return result;
      });
  }

  getStatus() {
    return this.readRegister()
      .then((data) => {
        const stat = data[2];

        if (stat == 0x00) {
          return `OK`;
        } else if (stat == 0x10) {
          return `RUNIN`;
        } else if (stat == 0x01) {
          return `BUSY`;
        } else if (stat == 0x80) {
          return `ERROR`;
        }

        return `UNRECOGNIZED DATA`;
      });
  }
}

iaq = new iAQ();

setInterval(() => {
  const reading = [
    iaq.getPrediction(),
    iaq.getResistance(),
    iaq.getTVOC(),
    iaq.getStatus(),
  ];

  Promise.all(reading)
    .then(([prediction, resistance, tvoc, status]) => {
      const data = {
        prediction,
        resistance,
        tvoc,
        status,
      };

      console.log(JSON.stringify(data, null, 2));
    });
}, 2000);
