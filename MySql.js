function MySQL(){
  var mysql = require('mysql');

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'hw'
  });

  connection.connect();

  MySQL.prototype.save = function(userArray){
    for(var i = 0;i < userArray.length;i++){
      var currentPlayer = userArray[i];
      var query = "INSERT INTO user(name,lvl,lastUpdateTime,prestige,gold)"+
        "values ('"+currentPlayer.name+
        "','"+currentPlayer.lvl+
        "','"+currentPlayer.lastUpdateTime+
        "','"+currentPlayer.prestige+
        "','"+currentPlayer.gold
      +"')";
      console.log(query);
      connection.query(query,function(err,results){
        if(err){
          console.log(err);
        }else{
          console.log(results);
        }
      })
    }
  }
}
module.exports = MySQL;
