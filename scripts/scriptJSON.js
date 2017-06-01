window.onload = function() {
	// hacemos la peticion al servidor para cargar las provincias
	var peticionProv = new XMLHttpRequest();
	if (peticionProv) {
		peticionProv.onreadystatechange = muestraProvincias;
		peticionProv.open("POST", "php/cargaDatosJSON.php");
		peticionProv.send();
	}
	// cuando cambie el select de "provincia" se ejecutará la función pideMunicipios
	document.getElementById("provincia").addEventListener("change", pideMunicipios);
}

function pideMunicipios() {
	// Al cambiar de provincia borramos todos los municipios cargados, incluso si no se ha seleccionado ninguna
	document.getElementById('municipio').options.length = 0;
	var provincia = document.getElementById("provincia").value;
	if(isNaN(provincia))
		return;		// si no se ha seleccionado ninguna no hago nada
	else
		provincia =  "provincia=" + provincia;
	var peticionMun = new XMLHttpRequest();
	if (peticionMun) {
		peticionMun.onreadystatechange = muestraMunicipios;
		peticionMun.open("POST", "php/cargaDatosJSON.php");
		peticionMun.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		peticionMun.send(provincia);
	}
}

function muestraMunicipios() {
	if (this.readyState == 4) {
		if (this.status == 200) {
			try {
				var arrayDatos = JSON.parse(this.responseText);
			} catch (err) {
				console.log("Error del servidor: "+this.responseText);
			}
			// Añadimos los nuevos datos
			var selectDatos = document.getElementById('municipio');
			selectDatos.options[0] = new Option("- selecciona -");		// Añadimos una opción de '---selecciona---'
			for(i=0; i<arrayDatos.length; i++) {						// y a continuación la opción de cada municipio
				selectDatos.options[i+1] = new Option(arrayDatos[i].nombre, arrayDatos[i].codigo);
			}
		}
	}
}

function muestraProvincias() {
	if (this.readyState == 4) {
		if (this.status == 200) {
			try {
				var arrayDatos = JSON.parse(this.responseText);
			} catch (err) {
				console.log("Error del servidor: "+this.responseText);
			}
			var selectDatos = document.getElementById('provincia');
			// Borrar elementos anteriores
			selectDatos.options.length = 0;
			// Añadir los nuevos datos
			selectDatos.options[0] = new Option("- selecciona -");		// Añadimos una opción de '---selecciona---'
			for(i=0; i<arrayDatos.length; i++) {						// y a continuación la opción de cada provincia
				selectDatos.options[i+1] = new Option(arrayDatos[i].nombre, arrayDatos[i].codigo);
			}
		}
	}
}
