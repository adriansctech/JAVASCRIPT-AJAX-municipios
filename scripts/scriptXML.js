window.onload = function() {
	// hacemos la peticion al servidor para cargar las provincias
	var peticionProv = new XMLHttpRequest();
	if (peticionProv) {
		peticionProv.onreadystatechange = muestraDatos;
		peticionProv.open("POST", "php/cargaDatosXML.php");
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
		peticionMun.onreadystatechange = muestraDatos;
		peticionMun.open("POST", "php/cargaDatosXML.php");
		peticionMun.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		peticionMun.send(provincia);
	}
}

/* Podría hacer una función para mostrar los datos de las provincias y otra para los de los
 * municipios como ha hecho en JSON pero he visto que lo que debo ahcer es siempre lo mismo
 * así que voy a hacer una única función y miro si me han pasado provincias o municipios
 * para saber qué select debo actualizar
 */
function muestraDatos() {
	if (this.readyState == 4) {
		if (this.status == 200) {
			// Primero voy a intentar cargar los municipios que me han pasado
			var arrayDatos = this.responseXML.getElementsByTagName("municipio");
			if (arrayDatos.length > 0) {		// Nos han enviado municipios
				var tipoDatos = "municipio";
			} else {
				// Si no hay municipios nos deben haber pasado provincias
				var arrayDatos = this.responseXML.getElementsByTagName("provincia");
				var tipoDatos = "provincia";
			}
			var selectDatos = document.getElementById(tipoDatos);
			// Borrar elementos anteriores
			selectDatos.options.length = 0;
			// Añadir los nuevos datos
			selectDatos.options[0] = new Option("- selecciona -");
			for(i=0; i<arrayDatos.length; i++) {
				var codigo = arrayDatos[i].getElementsByTagName("codigo")[0].firstChild.nodeValue;
				var nombre = arrayDatos[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;
				selectDatos.options[i+1] = new Option(nombre, codigo);
			}
		}
	}
}
