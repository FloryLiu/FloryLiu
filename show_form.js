$(document).ready(function(){
	var status_create; 
    $('.btn-create').click(function(){
    	var nameHome = $("#homename").val();
    	//send request to server
	    $.ajax({
			async : false,
			method: "post",
			data: JSON.stringify({ homeName:nameHome }),
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/createhome"
		}).done(function(data, textStatus, xhr){
			status_create = xhr.status;
		});

		if(status_create = 201){
			localStorage.setItem("storageName", nameHome);
			document.location.href = "newHome.html";
		}
	});
	
});
