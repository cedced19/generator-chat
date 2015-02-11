#!/usr/bin/env node
'use strict';
var md5 = require('MD5'),
      hapi = require('hapi'),
      app = new hapi.Server(),
      colors = require('colors'),
      port = <%= port %>,
      users = {},
      messages = [];


app.connection({ port: port }); 

app.route({
    method: 'GET',
    path: '/api/',
    handler: function (request, reply) {
        reply({users: users, messages: messages});
    }
});

app.route({
    method: 'GET',
    path: '/vendor/{param*}',
    handler: {
        directory: {
            path: './vendor/'
        }
    }
});

app.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('index.html');
    }
});


app.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: function (request, reply) {
        reply.file('favicon.ico');
    }
});

app.start(function () {
    console.log('Server running at\n  => '+ colors.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
});

var io = require('socket.io').listen(app.listener);
var users = new Object();


io.sockets.on('connection', function(socket){
    var me = false;

    socket.on('newmsg', function(message){
        message.user = me;
        message.time = require('./lib/time')();
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