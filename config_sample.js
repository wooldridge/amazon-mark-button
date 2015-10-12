var config = {};

config.button = {
  address: 'MAC_ADDRESS'
};

config.marklogic = {
  host: 'localhost',
  user: 'USER',
  pass: 'PASSWORD',
  db: 'Documents',
  // Supported operations: 'clear', 'backup', 'merge', 'reindex'
  op: 'merge'
};

module.exports = config;
