(function($){

        var msg = $('#msgtpl').html();
        var lastsender = false;
        $('#msgtpl').remove();
        var currentusr = "username";

        var socket = io.connect('<%= ip %>:<%= port %>');

        $('#loginform').submit(function(event){
          event.preventDefault();

          var use = MD5($('#mail').val());

          if($('#mail').val() == ''){
          <% if (english) { %>alert('You must enter an email!');<% }else{ %>
                alert('Vous devez entrer un mail !');<% } %>
          }else if(($("#"+use)).length){
          <% if (english) { %>alert($('#mail').val() +  ' email is already in use');<% }else{ %>
                alert('L\'email ' + $('#mail').val() +  ' est déjà utilisé');<% } %>
          }else if($('#username').val() == ''){
            <% if (english) { %>alert('You must enter a nickname!');<% }else{ %>
                alert('Vous devez entrer un pseudo !');<% } %>
          }else{
                socket.emit('login', {username: $('#username').val(), mail: $('#mail').val()});
                currentusr = $('#username').val();
          };
          return false;
          });

        $('#form').submit(function(event){
          event.preventDefault();
          if($('#message').val() == ''){
              <% if (english) { %>alert('You must enter an message!');<% }else{ %>
              alert('Vous devez entrer un message !');<% } %>
            }else{
              socket.emit('newmsg', {message : $('#message').val() });
              $('#message').val('');
            };
            $('#message').focus();
            return false;
        });

        socket.on('newmsg', function(message){
          if(lastsender != message.user.id){
            $('#messages').append('<div class="sep"></div>');
            lastsender = message.user.id;
          };
          if(message.user.username == currentusr){
            <% if (english) { %>user.username = "Me";<% }else{ %>
            user.username = "Moi";<% } %>
          }else{
            $('#sound')[0].play();
          };
          $('#messages').append( '<div class="message">' + Mustache.render(msg, message) + '</div>' );
          $("#messages").animate({ scrollTop: $("#messages").prop("scrollHeight") }, 500);
        });

        socket.on('logged', function(){
          $('#login').fadeOut();
        });

        socket.on('newusr', function(user){
          if(user.username == currentusr){
            <% if (english) { %>user.username = "Me";<% }else{ %>
            user.username = "Moi";<% } %>
          }
          $('#users').append('<img src="' + user.avatar + '" id="' + user.id + '" alt="' + user.username + '" title="' + user.username + '">')
        });

        socket.on('disusr', function(user){
          $('#'+user.id).slideUp(100, function(){
            $('#'+user.id).remove();
          });
        });


      })(jQuery);