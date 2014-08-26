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

          if($('#mail').val() == ''){
          <% if (languageSelected == 'english') { %>alert('You must enter an email!');<% } %>
          <% if (languageSelected == 'french') { %>alert('Vous devez entrer un mail !');<% } %>
          <% if (languageSelected == 'german') { %>alert('Geben Sie bitte eine E-Mail!');<% } %>
          }else if($('#username').val() == ''){
          <% if (languageSelected == 'english') { %>alert('You must enter a nickname!');<% } %>
          <% if (languageSelected == 'french') { %>alert('Vous devez entrer un pseudo !');<% } %>
          <% if (languageSelected == 'german') { %>alert('Geben Sie bitte eine Spitznamen!');<% } %>
          }else{
                socket.emit('login', {username: $('#username').val(), mail: $('#mail').val()});
          };
          return false;
          });

        $('#form').submit(function(event){
          event.preventDefault();
          if($('#message').val() == ''){
             <% if (languageSelected == 'english') { %>alert('You must enter an message!');<% } %>
             <% if (languageSelected == 'french') { %>alert('Vous devez entrer un message !');<% } %>
             <% if (languageSelected == 'german') { %>alert('Geben Sie bitte eine Meldung!');<% } %>
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
           alert(message);
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

      })(jQuery);