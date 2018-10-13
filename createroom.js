$(document).ready(function(){

	var status_create;
	var getHomeName = localStorage.getItem("storageName");
	var dataHome;
	var count=0;
	var listRoom;

		$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/getlistroom/"+getHomeName,
		}).done(function(data, textStatus, xhr){
			listRoom = data;
		});
		$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/gethome/"+getHomeName,
		}).done(function(data, textStatus, xhr){
			dataHome = data;
		});
	//End get Home

	for(count; count < listRoom.length; count++){
		appendRoom(count);
		$(".getnameroom"+count).val(listRoom[count].roomName);
		$(".getidroom"+count).val(listRoom[count].id_room);
		saveRoom(count);
	}

	function appendRoom(appendCount){
			$(".row").append("<div class='col-sm-3 room"+appendCount+"'></div>");
			// $(".row").append('<div id="room" class="collapse roomname'+appendCount+'"></div>');
			$(".room" + appendCount).append('<img src="Picture/room.jpeg" class="img-thumbnail room" alt="Room" width = 100%; height = 100%;>');
			$(".room" + appendCount).append("<div class='info"+appendCount+"'></div>");
			$(".info"+appendCount).append("<div class='form-group"+appendCount+"'></div>");
			$(".info"+appendCount).append('<button type="submit" class="btn btn-success btn-creroom'+appendCount+'">Save room</button>');
			$(".info"+appendCount).append('<button type="submit" class="btn btn-success btn-update'+appendCount+'">Update room</button>');
			$(".info"+appendCount).append('<a href="file:///D:/MONHOC/Luan_Van/Code/designRoom.html" target="_blank" class="goto'+appendCount+'"></a>');
			$(".goto"+appendCount).append('<img src="Picture/intoroom.jpg" class="img-thumbnail intoroom" alt="Go to room" data-toggle="tooltip" title="Go to room">');
			$(".form-group"+appendCount).append('<label for="roomname">Room name:</label>');
			$(".form-group"+appendCount).append('<input type="text" class="form-control getnameroom'+appendCount+'" id="roomname">');
			$(".form-group"+appendCount).append('<label for="idroom">Id room:</label>');
			$(".form-group"+appendCount).append('<input type="hiddent" class="form-control getidroom'+appendCount+'" id ="idroom" readonly>');
	}
	function saveRoom(saveCount){
		$(".btn-creroom"+saveCount).click(function(){
			var nameRoom = $(".getnameroom"+saveCount).val();
			var idRoom = parseInt($(".idroom"+saveCount)) 
			if(isNaN(idRoom)|| idRoom == null){
				idRoom = 0;
			}
			$.ajax({
				async : false,
				method: "post",
				data: JSON.stringify({roomName:nameRoom, homeProject:dataHome}),
				contentType: "application/json",
				url: "http://localhost:8080/smarthome/createroom"
			}).done(function(data, textStatus, xhr){
				
			});
		});
	}

	function updateRoom(updateCount){
		$(".btn-update"+updateCount).click(function(){
		var nameRoom = $(".getnameroom"+updateCount).val();
		var idRoom = listRoom.id_room;
		$.ajax({
			async : false,
			method: "post",
			data: JSON.stringify({ id_room: idRoom, roomName:nameRoom, homeProject:dataHome}),
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/updateroom"
		}).done(function(data, textStatus, xhr){

		});
		});
	}

	function gotoRoom(gotoCount){
		$(".goto"+gotoCount).click(function(){
		var nameRoom = $(".getnameroom"+gotoCount).val();
		var idRoom = listRoom.id_room;
		localStorage.setItem("storageRoomId", idRoom);
		});
	}

	$(".add_room").click(function(){
		appendRoom(count + 1);
		saveRoom(count + 1);
		updateRoom(count + 1);
		gotoRoom(count + 1);
		count++;
	});

	});