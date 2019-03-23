const {Readable} = require("stream");


class StringToStream extends Readable {

  constructor(testContent, options = {}) {
    super(Object.assign(options, {"objectMode": true}));
    this.testContent = testContent;
  }
  _read() {

    if (!this.testContent.length) {
      this.push(null);
      return;

    }
    this.push(`${this.testContent.shift() }\r\n`);
  }

}

module.exports = StringToStream;

