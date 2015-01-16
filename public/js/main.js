(function() {
  $(function() {
    var capitaliseFirstLetter, colors, curr_user, curr_user_color, error_notify_shown, socket;
    socket = io();
    curr_user = void 0;
    curr_user_color = void 0;
    error_notify_shown = false;
    colors = ['#e21400', '#91580f', '#f8a700', '#f78b00', '#58dc00', '#287b00', '#4ae8c4', '#3b88eb', '#3824aa', '#a700ff', '#d300e7'];
    $('#usernameSubmit').click(function() {
      return $('#usernameForm').submit();
    });
    $('#usernameForm').submit(function() {
      var errors, userColor;
      errors = [];
      if ($("#username").val().length < 2) {
        errors.push("The username has to be atleast 2 characters long");
      }
      if ($("#username").val().length > 20) {
        errors.push("The username has to less than or equal to 20 characters");
      }
      if (errors.length > 0) {
        if (error_notify_shown === true) {
          $('div.ui.error.message').remove();
          error_notify_shown = false;
        }
        $('<div class="ui error message"><i class="close icon"></i><div class="header">Oops, there was a problem</div><ul class="list" id="errorList"></ul>').prependTo("div.six.wide.column");
        $.each(errors, function(i, error) {
          return $("#errorList").append("<li>" + error + "</li>");
        });
        $("div.ui.error.message").addClass("ui grid transition hidden").transition('fade up', 500);
        error_notify_shown = true;
        $('div.ui.error.message i.close.icon').click(function() {
          $(this).parent('div').remove();
          return error_notify_shown = false;
        });
      } else if (errors.length === 0) {
        curr_user = capitaliseFirstLetter($("#username").val());
        userColor = colors[Math.floor(Math.random() * colors.length)];
        curr_user_color = userColor;
        socket.emit("login", curr_user);
        $('#chatBlock').addClass("ui grid transition hidden").show().transition('fade down');
        $('#current-user .header').html('Chatting as: <span id="currentUser" data-current-user="' + curr_user + '" data-color="' + userColor + '">' + curr_user + '</span>');
        $('#usernameBlock').hide();
      }
      return false;
    });
    $("form#messageForm").submit(function() {
      if ($("#m").val().length !== 0) {
        socket.emit("chat message", {
          username: curr_user,
          color: curr_user_color,
          msg: $("#m").val()
        });
        $("#m").val("");
      }
      return false;
    });
    socket.on("usernames", function(usernames) {
      $("#userlist").children(".item").not('.header').remove();
      return $.each(usernames, function(i, username) {
        if (username === curr_user) {
          return $("#userlist").append($("<div class='item' data-user='" + username + "'>").html("<b>" + username + "</b>"));
        } else {
          return $("#userlist").append($("<div class='item' data-user='" + username + "'>").text(username));
        }
      });
    });
    socket.on("chat message", function(username, color, time, msg) {
      if ($('#nomsg').length !== 0) {
        $('#nomsg').remove();
      }
      $('<li class="ui transition hidden"><span class="timestamp">' + time + '</span> <b style="color: ' + color + ';">' + username + '</b>: ' + msg + '</li>').transition('fade up', 150).appendTo("ul#messages");
    });
    socket.on("countUser", function(num) {
      return $("#countUsers").html(num);
    });
    socket.on("disconnected", function(username) {
      $('<li style="color: #ccc" class="ui transition hidden">' + username + ' has left the chatroom.</li>').transition('fade up', 150).appendTo("ul#messages");
      return $("#userlist div[data-user=" + username + "]").remove();
    });
    return capitaliseFirstLetter = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  });

}).call(this);
