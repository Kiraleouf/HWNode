var Ressource = require('./ressource.js');

function User (name) {

  this.name = name;

  this.lvl = 1;

  this.prestige = 1;

  this.gold = 0;

  this.ressources = [];

  this.lastUpdateTime = 0;

  User.prototype.update = function(){
    if(this.lastUpdateTime == 0){
      this.lastUpdateTime = Date.now();
      this.gold = 1;
    }else{
      var delta = (Date.now() - this.lastUpdateTime)/1000;
      this.lastUpdateTime = Date.now();
      this.gold = this.gold + (delta * this.lvl * this.prestige);
      this.gold = roundDecimal(this.gold,2);
    }

    for (var i = 0;i<this.ressources.length;i++) {
      this.ressources[i].update(this.prestige);
    }

    return("Player updated ! now level: " + this.lvl+" with " + this.gold + " golds.");
  };

  User.prototype.lvlUp = function(cost){
    if(this.gold > cost){
      this.lvl ++;
      this.gold = this.gold - cost;
    }
  }

  User.prototype.doPrestige = function(){
    if(this.lvl >= 30){
      this.prestige ++;
      this.gold = 0;
      this.lvl = 1;
      this.lastUpdateTime = 0;
      return "prestige succes."
    }else{
      return "can't prestige now."
    }
  }

  User.prototype.lvlUpRessource = function(cost,index){
    if(this.ressources[index] != undefined && this.gold > cost){
      this.ressources[index].lvlUp();
      this.gold = this.gold - cost;
      return "upgrade succes."
    }else{
      return "can't up ressource now."
    }
  }

  User.prototype.initRessources = function(){
    var res1 = new Ressource("Charbon");
    var res2 = new Ressource("Fer");
    var res3 = new Ressource("Cuivre");
    var res4 = new Ressource("Bois");
    this.ressources.push(res1);
    this.ressources.push(res2);
    this.ressources.push(res3);
    this.ressources.push(res4);
    console.log("ressources initialised succes ! ");
  }
}
module.exports = User;

function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}
