(function() {
  $(function() {
    $('#chatBlock').hide();
    $("#usernameBlock").addClass("ui grid transition hidden").transition('fade down');
    return $('form:first *:input[type!=hidden]:first').focus();
  });

}).call(this);
