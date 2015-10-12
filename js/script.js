$(document).ready(function () {

  var socket = io.connect(
    'http://' + config.server.host + ':' + config.server.port
  );
  socket.on('button', function (data) {
    console.log('button');
    console.dir(data);
    var html = '<p>' + data.last + '</p>';
    $("#content").prepend(html);
  });

});
