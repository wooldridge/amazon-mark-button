var config = require('./config'),
    dash_button = require('node-dash-button'),
    sound = require('mac-sounds'),
    request = require('request'),
    express = require('express');

// Last button press timestamp
var d = null;

// Set up sounds
var mac_sounds = [
  'basso',
  'blow',
  'bottle',
  'frog',
  'funk',
  'glass',
  'hero',
  'morse',
  'ping',
  'pop',
  'purr',
  'sosumi',
  'submarine',
  'tink'
];

// Set up express
var app = express(),
    router = express.Router();

// Serve static files and dependencies
app.use(express.static(__dirname + '/'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// Only requests to /api/ will be sent to router.
app.use('/api', router);

// Listen on port
var server = app.listen(config.server.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

// GET last button press
router.get('/button/last', function(req, res, next) {
  data = {"last": d};
  res.type('application/json');
  console.log('Sending /button/last data')
  console.dir(data);
  res.json(data);
});

// Perform database operation
var database = function (id, operation) {
  var body = '';
  var url = 'http://' + config.marklogic.host + ':8002' +
          '/manage/v2/databases/' + id;
  console.log('in database(): ' + url);
  switch (operation) {
    case 'clear':
        body = '{ "operation": "clear-database"}';
        break;
    case 'backup':
        body = '{ "operation": "backup-database", "backup-dir": "/temp/backups"}';
        break;
    case 'merge':
        body = '{ "operation": "merge-database"}';
        break;
    case 'reindex':
        body = '{ "operation": "reindex-database"}';
        break;
  }
  request({
    method: "POST",
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      user: config.marklogic.user,
      pass: config.marklogic.password,
      sendImmediately: false
    },
    body: body
  }, function (error, response, body) {
    if (response) {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log('Database operation: ' + id + ', ' + operation);

      } else {
        console.log('Error: '+ response.statusCode);
        console.log(body);
        response.status(response.statusCode).send();
      }
    } else {
    console.log('Error: No response object');
  }
  });
};

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log('connection established');
  // Receive messages from connections here
});

// Handle button presses
var dash = dash_button(config.button.address);
console.log('Script started. Now press the Amazon Dash Button.')
dash.on('detected', function (){
  // Write to console
  d = new Date();
  console.log('Button press detected: ' + d);
  // Play random sound on Mac OS X
  var random_sound = mac_sounds[Math.floor(Math.random() * mac_sounds.length)];
  sound(random_sound);
  // Send message to connections
  var data = {last: d};
  io.sockets.emit('button', data);
  // Clear database
  database('Documents', 'reindex');
});
