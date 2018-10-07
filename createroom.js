$(document).ready(function(){

	var status_create;
	var getName = localStorage.getItem("storageName");
	var dataHome;
	var count=0;
	var listRoom;

		$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/getlistroom/"+getName,
		}).done(function(data, textStatus, xhr){
			listRoom = data;
		});
		$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/gethome/"+getName,
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
			$(".row").append('<div id="room" class="collapse roomname'+appendCount+'"></div>');
			$(".room" + appendCount).append('<img src="Picture/room.jpeg" class="img-thumbnail room" alt="Room" data-toggle="collapse" data-target=".roomname'+appendCount+'" width = 100%; height = 100%;>');
			$(".roomname"+appendCount).append("<div class='form-group"+appendCount+"'></div>");
			$(".roomname"+appendCount).append('<button type="submit" class="btn btn-primary btn-creroom'+appendCount+'">Create room</button>');
			$(".form-group"+appendCount).append('<label for="roomname">Room name:</label>');
			$(".form-group"+appendCount).append('<input type="text" class="form-control getnameroom'+appendCount+'" id="roomname">');
			$(".form-group"+appendCount).append('<input type="hiddent" class="form-control getidroom'+appendCount+'" id ="idroom">');
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
				// data: JSON.stringify({ roomName: nameRoom, homeProject:dataHome, id_room: idRoom }),
				data: JSON.stringify({roomName:nameRoom, homeProject:dataHome}),
				contentType: "application/json",
				url: "http://localhost:8080/smarthome/createroom"
			}).done(function(data, textStatus, xhr){
				// status_create = xhr.status;
			});
		});
	}

	$(".add_room").click(function(){
		appendRoom(count + 1);
		saveRoom(count + 1);
		count++;
	});

	});