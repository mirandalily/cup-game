var profileCollection = [];

var Profile = function(title, img, body){
  this.title = title;
  this.img = img;
  this.body = body;
};

var getTemplate = function() {
  $.get('template.html').done(function(data, msg, xhr) {
    Profile.prototype.template = Handlebars.compile(data);
    createProfiles();
  });
};

Profile.prototype.template = '';

Profile.prototype.toHTML = function() {
  return this.template(this);
};

createProfiles = function() {
  $.getJSON('profiles.json')
  .fail(function(message) {
    console.log('error', message);
  })
  .done(function(data) {
    console.log('working', data);
    data.forEach(function(person) {
      var temp = new Profile(person.title, person.img, person.body);
      console.log(temp);
      profileCollection.push(temp);
      $('.pictures-row-one').append(temp.toHTML());
    });
  });
};

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

//template creation function


$(document).ready(function(){
  $('#about').hide();
  $('#highscores').hide();
  $('#main').show();
  getTemplate();
});
