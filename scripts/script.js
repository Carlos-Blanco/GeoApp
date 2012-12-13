
function localizar(){
	navigator.geolocation.getCurrentPosition(datos,fallo);
	
	function datos(pos){
		contenedor = document.getElementById("map");
		latitud = pos.coords.latitude;
		longitud = pos.coords.longitude;
		accuracy = pos.coords.accuracy;
		altitude = pos.coords.altitude;
		centro = new google.maps.LatLng(latitud,longitud);
		propiedades = {
			center: centro,
			draggable: true,
			KeyBoardShortcuts: false,
			mapTypeControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			navigationControl: false,
			scrollwheel: true,
			streetViewControl: false,
			zoom: 16
		};
		map = new google.maps.Map(contenedor,propiedades);
		var marker = new google.maps.Marker({
			position: centro,
			map: map
		});
	}

	function fallo(error){
		alert("No es posible localizar tu posición");
	}
}

function guardarPosicion(poslat,poslon){
	if (confirm("Warning!! If you Save the Position, the previous position will be delete.")) {
		localizar();
		localStorage.setItem(poslat, latitud);
		localStorage.setItem(poslon, longitud);
		$("#pop").fadeOut(1000);
	} else {
		$("#pop").fadeOut(1000);
		return false;
	}
}

function mostrarPosicion(poslat,poslon){
	var moslat =localStorage.getItem(poslat);
	var moslon =localStorage.getItem(poslon);
	var moscentro = new google.maps.LatLng(moslat,moslon);
	var marker = new google.maps.Marker({
			position: moscentro,
			map: map
	});
	var ruta = [
        new google.maps.LatLng(latitud, longitud),
        new google.maps.LatLng(moslat, moslon)
    ];
    var lineas = new google.maps.Polyline({
        path: ruta,
        map: map,
        strokeColor: '#30488A',
        strokeWeight: 4,
        strokeOpacity: 0.6,
        clickable: false
	 });
}


$("#save").click(function(){
	$("#pop").fadeIn(1000);
});





