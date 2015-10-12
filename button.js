var config = require('./config'),
    dash_button = require('node-dash-button'),
    request = require('request');

// Perform database operation
var databaseOp = function (id, op) {
  var body = '';
  switch (op) {
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
    url: 'http://' + config.marklogic.host + ':8002' + '/manage/v2/databases/' + id,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      user: config.marklogic.user,
      pass: config.marklogic.pass,
      sendImmediately: false
    },
    body: body
  }, function (error, response, body) {
    if (response) {
      console.log('Response status: ' + response.statusCode);
      console.log('Database operation: ' + id + ', ' + op);
    } else {
      console.log('Error: No response object');
    }
  });
};

// Handle button press
var dash = dash_button(config.button.address);

console.log('Press the Amazon Dash Button to perform ' +
  config.marklogic.op + ' on database ' + config.marklogic.db + '.')

dash.on('detected', function (){
  console.log('Button press detected: ' + new Date());
  databaseOp(config.marklogic.db, config.marklogic.op);
});
