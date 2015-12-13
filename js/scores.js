webDB.init();

var table = $('table')[0];
var tbody = $('tbody')[0];
var scores;

function makeTable(){
  var position = 1;
  for (var i = scores.length - 1; i > -1; i--) {
    var tr = document.createElement('tr');
    var rank = document.createElement('td');
    var user = document.createElement('td');
    var score = document.createElement('td');
    rank.innerHTML = position;
    user.innerHTML = scores[i].n;
    score.innerHTML = scores[i].s;
    tr.appendChild(rank);
    tr.appendChild(user);
    tr.appendChild(score);
    tbody.appendChild(tr);
    position++;
  }
}

var createSQL = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'CREATE TABLE IF NOT EXISTS highscores ( id INT, n TEXT, s INT, PRIMARY KEY (id));',
      },
    ],
    callback
  );
};

var countSQL = function() {
  webDB.execute(
    [
      {
        sql: 'SELECT COUNT(*) FROM highscores'
      },
    ],
    function(data) {
      var count = data[0]['COUNT(*)'];
      if(count === 0) {
        insertSQL();
      }
    }
  );
};

var insertSQL = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO highscores (n, s) VALUES (?, ?), (?, ?), (?, ?), (?, ?), (?, ?);',
        'data': ['AAA', 1000, 'ABB', 1200, 'BBB', 1400, 'CCC', 1600, 'DDD', 1800],
      },
    ],
    callback
  );
};


function checkLocal() {
  if (localStorage.scores){
    scores = JSON.parse(localStorage.scores);
  }else {
    scores = [{n:'AAA',s: 1000}, {n: 'ABB', s: 1200}, {n: 'BBB', s: 1400}, {n: 'CCC', s: 1600}, {n: 'DDD', s: 1800}];
  }
}

$(document).ready(function() {
  checkLocal();
  makeTable();
  createSQL(countSQL);
});
