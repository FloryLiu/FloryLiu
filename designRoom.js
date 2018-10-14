$(document).ready(function(){

	var getRoomId = localStorage.getItem("storageRoomId");
	addDevice();
	function addDevice(){
		$(".btn-finish").click(function(){
			var listDevice = [];
			$("#defaultCheck:checked").each(function(){
				var type = $(this).attr("name");
				var name = $(".enter"+type).attr("name");
				var number = $(".enter"+name).val();
				for(var i=0;i<number;i++){
					if( type == "light"){
						createDevice("Light");
					}else if (type == "door"){
						createDevice("Door");
					}
					else if (type == "fan"){
						createDevice("Fan");
					}
					else if (type == "fridge"){
						createDevice("Fridge");
					}
					else if (type == "wash"){
						createDevice("Washing machine");
					}
					else if (type == "heaters"){
						createDevice("Heaters");
					}
					else if (type == "air"){
						createDevice("Air conditional");
					}
					else if (type == "cooker"){
						createDevice("Cooker");
					}
					else if (type == "socket"){
						createDevice("Smart socket");
					}
					else if (type == "switch"){
						createDevice("Smart switch");
					}
				}
			});
		});
	}
	
	function createDevice(typeDevice){
		$("tbody").append(
			"<tr>"
				+ "<td>"
					+ "<input class='namelight name' type='text' name='nameLight' placeholder='Enter the name of device'>"
				+"</td>"
				+ "<td>"+typeDevice+" </td>"
				+ "<td>off</td>"
				+ "<td>"
					+ "<a href='#'>Delete</a>"
				+"</td>"
			+ "</tr>"
		)
	}

	function cancel(){
		$(".btn-cancel").click(function(){
			alert("Do you want to cancel? The selected device will not be created.");
		});
	}

	});

	