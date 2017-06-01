<?php
	ini_set("display_errors", 0);

	require_once "connexio.inc";	
	$mysqli = new mysqli($servidor, $usuario, $contrasenya, $basedades) or die("Error de connexio amb la base de dades ".$mysqli->connect_error);
	$mysqli->set_charset('utf8');

	if (isset($_POST["provincia"])) {		// nos piden municipios
		$consulta = "select municipio As nombre, CONCAT(cod_prov, cod_muni) As codigo from municipios where cod_prov='".$_POST['provincia']."'";
	} else {			// Nos piden las provincias
		$consulta = "select provincia As nombre, cod_prov As codigo from provincias";
	}

	$rs = $mysqli->query($consulta)  or die ("No s'ha pogut executar la consulta");
	$datos=Array();		// Array que contendrá todos los datos (municipios o provincias)
	while ($registre = $rs->fetch_assoc()) {
		$dato['codigo']=$registre['codigo']; 
		$dato['nombre']=$registre['nombre']; 
		$datos[]=$dato;		// Añadimos los datos del municipio/provincia actual al array de datos
  	}
	echo json_encode($datos); 
	$rs->free();
	$mysqli->close();
?>
