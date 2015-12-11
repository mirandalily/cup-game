$(document).ready(function(){
  $('#about').hide();
  $('#highscores').hide();
  $('#main').show();
  checkLocal();
  makeTable();
});


$('#mainNav').on('click', function(event) {
  event.preventDefault();
  $('#about').hide();
  $('#highscores').hide();
  $('#main').show();
});

$('#aboutNav').on('click', function(event) {
  event.preventDefault();
  $('#about').show();
  $('#highscores').hide();
  $('#main').hide();
});
