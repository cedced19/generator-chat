var http = require("http"),
    md5 = require("MD5"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || <%= port %>;

httpServer = http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
  };

  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {'Content-Type': 'text/html'});
      fs.createReadStream('404.html').pipe(response);
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        fs.createReadStream('500.html').pipe(response);
        return;
      }

      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log("Server running at\n  => http://<%= ip %>:" + port + "/\nCTRL + C to shutdown");

var io = require('socket.io').listen(httpServer);
var users = {};


io.sockets.on('connection', function(socket){
    var me = false;

    for (var k in users){
        socket.emit('newusr', users[k]);
    };

    socket.on('newmsg', function(message){
        message.user = me;
        message.time = getTime();
        io.sockets.emit('newmsg', message);
    });

    socket.on('login', function(user){
      var md5Mail = md5(user.mail.toLowerCase()),
       error = null;

       for(var k in users){
            if(k == md5Mail){
              <% if (languageSelected == 'english') { %>error = "This email is already in use"<% } %>
              <% if (languageSelected == 'french') { %>error = "Cette email est déjà utilisé";<% } %>
              <% if (languageSelected == 'german') { %>error = "Diese E-Mail ist bereits im Einsatz";<% } %>
            }
        }

        if(error !== null){
          socket.emit('logerr', error);
       }else{
       me = user;
       me.id =md5Mail;
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

function getTime(){
    var date = new Date(),
      h = date.getHours(),
      m = date.getMinutes();

   return (h < 10 ? "0" : "") + h + ':' + (m < 10 ? "0" : "") + m;
 }