var CONSTANTS = require('./constants.js');
var cst =  new CONSTANTS();
function Ressource (name) {

  this.name = name;

  this.lvl = 1;

  this.ammount = 0;

  this.lastUpdateTime = 0;

  this.currentUpgradeCost = cst.LVL_COST[0];

  Ressource.prototype.update = function(userPrestige){
    if(this.lastUpdateTime == 0){
      this.lastUpdateTime = Date.now();
      this.ammount = 1;
    }else{
      var delta = (Date.now() - this.lastUpdateTime)/1000;
      this.lastUpdateTime = Date.now();
      this.ammount = this.ammount + (delta * this.lvl * userPrestige);
      if(this.ammount > 1000 * this.lvl * userPrestige) this.ammount = 1000*this.lvl*userPrestige;
      this.ammount = roundDecimal(this.ammount,2);
    }
  };

  Ressource.prototype.lvlUp = function(){
    this.lvl ++;
    this.currentUpgradeCost = cst.LVL_COST[this.lvl-1]
  }

}
module.exports = Ressource;

function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}
