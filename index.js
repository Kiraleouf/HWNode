$(document).ready(function(){


  $(document.body).on('click', 'button', function() {
    upgradeRessource(this.id);
  });

  $("#addLvlButton").click(function(){
    addLevel()
  });


	function refreshLoop(){
		getCost();
		refresh();
		setTimeout(refreshLoop, 1000);
	}

	function refresh(){
		getUser()
		var data="hello";
		$.get("http://172.16.152.125:3000/", function(response) {
			data = response;
			$("#userData").text(data);
		}).fail(function(){
			$("#userData").text("Sorry could not proceed");
		});
	}

	function addLevel(){
		var data="hello";
		$.get("http://172.16.152.125:3000/lvlUpUser", function(response) {
			data = response;
			console.log(data);
			$("#userData").text(data);
		}).fail(function(){
			$("#userData").text("Sorry could not proceed");
		});
	}

	function getCost(){
		var data="hello";
		$.get("http://172.16.152.125:3000/lvlUpCost", function(response) {
			data = response;
			if(data=="MAX"){
				$("#addLvlButton").text(data);
			}else{
				$("#addLvlButton").text("lvl up for "+ data + "golds");
			}
		}).fail(function(){
			$("#addLvlButton").text("error");
		});
	}

	function getUser(){
		$.get("http://172.16.152.125:3000/getUserInfos", function(response) {
			var user = jQuery.parseJSON(response);
			$("#nickname").text("Hello "+user.name+"!");
			generateTableRessource(user.ressources);
		}).fail(function(){
			$("#addLvlButton").text("error");
		});
	}

 function upgradeRessource(index){
    $.post( "http://172.16.152.125:3000/lvlUpRessource", {'id' : index}).done(function( data ) {
      console.log( "Data Loaded: " + data );
      refresh()
    });
	}

	function generateTableRessource(ressources){
		$('#myTable tbody').remove();
		$('#myTable').append('<tbody>')
		for (i = 0; i < ressources.length; i++) {
			$('#myTable')
			.append(
			'<tr><td>'
			+ressources[i].name+
			'</td><td>'
			+ressources[i].ammount
			+'</td><td>'
			+"lvl " + ressources[i].lvl
			+'</td><td>'
			+'<button id='+ i +'>upgrade for '+ ressources[i].currentUpgradeCost +' golds </button>'
			+'</td></tr>');
		}
		$('#myTable').append('</tbody>')
	}


	getUser();
	getCost();
	refreshLoop();
});
