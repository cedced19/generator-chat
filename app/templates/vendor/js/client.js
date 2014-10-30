(function($){

        var msg = $('#msgtpl').html(),
              msgline = $('#msgtpl-line').html(),
              lastsender = false,
              currentusr = '',
              uri = 'http://' + window.location.host,
              socket = io.connect(window.location.host);

        $('#msgtpl').remove();
        $('#msgtpl-line').remove();

         $.getJSON(uri + '/users', function (users) {
          for (var user in users){
            displayUser(users[user]);
          }
         });


         $.getJSON(uri + '/messages', function (messages) {
          for (var message in messages){
            displayMessage(messages[message]);
          }
         });

        $('#loginform').submit(function(event){
          event.preventDefault();

          var mail = $('#mail').val().replace(/ /g, ''),
          username = $('#username').val().replace(/ /g, '');

          if(username == ''){
          <% if (languageSelected == 'english') { %>sweetAlert('Oops...', 'You must enter a nickname!', 'error');<% } %>
          <% if (languageSelected == 'french') { %>sweetAlert('Oups...', 'Vous devez entrer un pseudo !', 'error');<% } %>
          <% if (languageSelected == 'german') { %>sweetAlert('Ups! ...', 'Geben Sie bitte eine Spitznamen!', 'error');<% } %>
          }else if(mail == ''){
                socket.emit('login', {username: $('#username').val(), mail: generateId()});
          }else{
                socket.emit('login', {username: $('#username').val(), mail: $('#mail').val()});
          };
          return false;
          });

        $('#msgform').submit(function(event){
          event.preventDefault();
          var message = $('#message').val().replace(/ /g, '');
           if(message == ''){
             <% if (languageSelected == 'english') { %>sweetAlert('Oops...', 'You must enter an message!', 'error');<% } %>
             <% if (languageSelected == 'french') { %>sweetAlert('Oups...', 'Vous devez entrer un message !', 'error');<% } %>
             <% if (languageSelected == 'german') { %>sweetAlert('Ups...', 'Geben Sie bitte eine Meldung!', 'error');<% } %>
            }else{
              socket.emit('newmsg', {message : twttr.txt.autoLink(twttr.txt.htmlEscape($('#message').val())) });
              $('#message').val('');
            };
            $('#message').focus();
            return false;
        });

        socket.on('newmsg', function(message){
          displayMessage(message);
        });

        socket.on('logged', function(){
                $('#login').fadeOut();
                currentusr = $('#username').val();
                $('#message').focus();
        });

        socket.on('logerr', function(message){
           sweetAlert('Oops...', message, 'error')
         });

        socket.on('newusr', function(user){
          displayUser(user);
        });

        socket.on('disusr', function(user){
          $('#'+user.id).slideUp(100, function(){
            $('#'+user.id).remove();
          });
        });


        function displayUser (user) {
           if(user.username == currentusr){
            <% if (languageSelected == 'english') { %>user.username = "Me";<% } %>
            <% if (languageSelected == 'french') { %>user.username = "Moi";<% } %>
            <% if (languageSelected == 'german') { %>user.username = "Mir";<% } %>
          }
          $('#users').append('<img src="' + user.avatar + '" id="' + user.id + '" alt="' + user.username + '" title="' + user.username + '">');
        }

        function displayMessage (message) {
           if(message.user.username == currentusr){
            <% if (languageSelected == 'english') { %>message.user.username = "Me";<% } %>
            <% if (languageSelected == 'french') { %>message.user.username = "Moi";<% } %>
            <% if (languageSelected == 'german') { %>message.user.username = "Mir";<% } %>
          }else{
            $('#sound')[0].play();
          }

          if(lastsender != message.user.id){
            $('#messages').append('<div class="sep"></div>');
            $('#messages').append( '<div class="message">' + Mustache.render(msg, message) + '</div>' );
            lastsender = message.user.id;
          }else{
            $('#messages').append( '<div class="message">' + Mustache.render(msgline, message) + '</div>' );
          }
          $('#messages').animate({ scrollTop: $('#messages').prop('scrollHeight') }, 500);
        }

        function generateId() {
                 var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
                 var stringLength = 8;
                 var randomstring = "";
                 for(var i = 0; i < stringLength; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum, rnum + 1);
            }
            return randomstring;
        }

      })(jQuery);