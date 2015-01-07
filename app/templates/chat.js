var md5 = require('MD5'),
      express = require('express'),
      app = express(),
      serveStatic = require('serve-static'),
      colors = require('colors'),
      port = <%= port %>,
      users = {},
      messages = [];


app.get('/api/users', function(req, res) {
        res.json(users);
});

app.get('/api/messages', function(req, res) {
        res.json(messages);
});


app.use(serveStatic(process.cwd()));

var server = require('http').createServer(app);

server.listen(port, function() {
    console.log('Server running at\n  => '+ colors.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
});

var io = require('socket.io').listen(server);
var users = new Object();


io.sockets.on('connection', function(socket){
    var me = false;

    socket.on('newmsg', function(message){
        message.user = me;
        message.time = getTime();
        if(messages.length > 10){
          messages.shift();
        }
        messages.push(message);
        io.sockets.emit('newmsg', message);
    });

    socket.on('login', function(user){
      var md5Mail = md5(user.mail.toLowerCase()),
      error = null;

      for(var k in users){
          if(k == md5Mail){
            <% if (languageSelected == 'english') { %>error = 'This email is already in use';<% } %>
            <% if (languageSelected == 'french') { %>error = 'Cette email est déjà utilisé';<% } %>
            <% if (languageSelected == 'german') { %>error = 'Diese E-Mail ist bereits im Einsatz';<% } %>
          }
      }

      if(error !== null){
        socket.emit('logerr', error);
      }else{
       me = user;
       me.id = md5Mail;
       me.avatar = '//gravatar.com/avatar/' + me.id + '?s=50';
       socket.emit('logged');
       users[me.id] = me;
       io.sockets.emit('newusr', me);
    }
  });

    socket.on('disconnect', function(){
        if(!me){
            return false;
        }
       delete users[me.id];
       io.sockets.emit('disusr', me);
    });
});

var getTime = function (){
  var date = new Date(),
    h = date.getHours(),
    m = date.getMinutes();

  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
}