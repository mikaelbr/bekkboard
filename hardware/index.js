var EventEmitter = require('events').EventEmitter;

var hardware = module.exports = new EventEmitter();
//var e = nobleEmitter.connect(peripheralUuid, serviceUuid, characteristicUuid);

var e = require('./serialport');

var commands = {
  0: function () {
    emitScore('a');
  },
  1: function () {
    emitScore('b');
  },
  2: function () {
    emitUndo('a');
  },
  3: function () {
    emitUndo('b');
  }
};

e.on('connected', function () {
  console.log('ble connected');
  hardware.emit('connected');
});

e.on('data', function (data) {
  console.log(data);
  commands[data]();
});

e.on('disconnected', function () {
  console.log('ble disconnected');
  hardware.emit('disconnected');
});

function emitScore (side) {
  hardware.emit('score', { side: side });
}

function emitUndo (side) {
  hardware.emit('undo', { side: side });
}
