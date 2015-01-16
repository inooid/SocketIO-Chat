$ ->
  $('#chatBlock').hide();
  $("#usernameBlock").addClass("ui grid transition hidden").transition('fade down')
  $('form:first *:input[type!=hidden]:first').focus()