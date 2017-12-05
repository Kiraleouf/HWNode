'use strict';
var express = require('express');
var session = require('express-session');
var app = express();
var USER = require('./user.js');
var CONSTANTS = require('./constants.js');
var bodyParser = require('body-parser');
var cookieparser = require('cookie-parser')
var path    = require("path");
//var mysql = require("./MySql.js");
//var mysqlCon = new mysql();
var cst = new CONSTANTS();
var listUser = [];
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({
    secret: "TADATA"
}));

app.use("/front", express.static(__dirname + '/front'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.redirect("/home")
});

app.get('/save',function(){
  //mysqlCon.save(listUser);
})

app.get('/getUserInfos', function(req, res) {
  var sess = req.session;
  if(req.session != undefined){
    if(req.session.username != undefined){
      res.send(JSON.stringify(getUserByName(req)))
    }else{
      res.redirect("/authPage")
    }
  }else{
    res.redirect("/authPage")
  }
});

app.get('/authPage', function(req, res) {
  res.sendFile(path.join(__dirname+"/front/login.html"));
})

app.get('/home', function(req, res) {
  if(req.session.username != undefined){
    console.log(req.session);
    res.sendFile(path.join(__dirname+"/front/home.html"));
  }else {
    res.redirect("/authPage")
  }
})

app.get('/getRessources', function(req, res) {
  var currentUser = getUserByName(req);
  res.send(JSON.stringify(currentUser.ressources))
});

app.get('/update', function(req, res) {
  var user = getUserByName(req);
  res.send(user.update());
})
app.post('/login', function(req, res) {
  var sess = req.session;
  sess = req.session
  var name = req.body.username;

  sess.username = name;

  var user = new USER(name);

  console.log(sess);
  listUser.push(user);
  user.initRessources();
  res.redirect("/home");
});

app.get('/lvlUpUser', function(req, res) {
  var user = getUserByName(req)
  user.lvlUp(cst.LVL_COST[user.lvl]);
  res.send(user.update());
});

app.post('/lvlUpRessource', function(req, res) {
  var index = Number(req.body.id)
  var user = getUserByName(req)
  user.lvlUpRessource(cst.LVL_COST[user.ressources[index].lvl],index);
  res.send("Done")
});

app.get('/lvlUpCost', function(req, res) {
  var currentUser = getUserByName(req);
  if(currentUser != undefined){
    if(currentUser.lvl < 30){
      res.send(""+cst.LVL_COST[currentUser.lvl]);
    }else{
      res.send("MAX");
    }
  }else{
    res.redirect("/authPage")
  }
});

app.get('/prestige', function(req, res) {
  res.send(user.doPrestige());
});

//TODO Securise this route with admin account
app.get('/godMod',function(req,res){
  var user = getUserByName(req)
  user.lvl = 30;
  user.gold = 300000000;
  user.prestige = 100;
  res.send("cheat ON");
});

function getUserByName(req){
  var sess = req.session;
  for(var i =0;i<listUser.length;i++){
    if(listUser[i].name == req.session.username){
      return listUser[i]
    }
  }
  return undefined;
}

app.get('/getScores',function(req,res){
  var sess = req.session;
  var listScores = [];
  for(var i =0;i<listUser.length;i++){
    listScores[i] = listUser[i];
  }
  console.log("ListScores : ")
  console.log(listScores)
  res.send(listScores);
});

app.listen(8080);
