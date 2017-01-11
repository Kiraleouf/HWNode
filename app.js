var express = require('express');
var app = express();
var USER = require('./user.js');
var CONSTANTS = require('./constants.js');

var cst = new CONSTANTS();
var user = new USER("kira");
user.initRessources();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.send(user.update());
});

app.get('/getUserInfos', function(req, res) {
  res.send(JSON.stringify(user))
});

app.get('/getRessources', function(req, res) {
  res.send(JSON.stringify(user.ressources))
});

app.get('/lvlUpUser', function(req, res) {
  user.lvlUp(cst.LVL_COST[user.lvl]);
  res.send(user.update());
});

app.get('/lvlUpRessource', function(req, res,index) {
  user.lvlUpRessource(cst.LVL_COST[user.ressources[index].lvl],index);
  res.send(user.update());
});

app.get('/lvlUpCost', function(req, res) {
  if(user.lvl < 30){
    res.send(""+cst.LVL_COST[user.lvl]);
  }else{
    res.send("MAX");
  }
});


app.get('/prestige', function(req, res) {
  res.send(user.doPrestige());
});

//TODO Securise this route with admin account
app.get('/lvlMax',function(req,res){
  user.lvl = 30;
  res.send("cheat ON ! Current level = "+user.lvl);
});

app.listen(3000);
