<?php
	// Para que el navegador interprete el código como XML hay que añadir esta línea
	header("Content-type: text/xml");
	
	require_once "connexio.inc";	
	$mysqli = new mysqli($servidor, $usuario, $contrasenya, $basedades) or die("Error de connexio amb la base de dades ".$mysqli->connect_error);
	$mysqli->set_charset('utf8');

	if (isset($_POST["provincia"])) {		// nos piden municipios
		$consulta = "select municipio As nombre, CONCAT(cod_prov, cod_muni) As codigo from municipios where cod_prov='".$_POST["provincia"]."'";
		$etiqueta = "municipio";
	} else {			// Nos piden las provincias
		$consulta = "select provincia As nombre, cod_prov As codigo from provincias";
		$etiqueta = "provincia";
	}
	$rs = $mysqli->query($consulta)  or die ("No s'ha pogut executar la consulta");
	echo "<?xml version='1.0' encoding='utf-8' ?>\n"; 
	echo "<".$etiqueta."s>\n"; 
	while ($registre = $rs->fetch_assoc()) {
		echo "\t<".$etiqueta.">\n";
		echo "\t\t<codigo>$registre[codigo]</codigo>\n"; 
		echo "\t\t<nombre>$registre[nombre]</nombre>\n"; 
		echo "\t</".$etiqueta.">\n";
  	}
	echo "</".$etiqueta."s>\n"; 
	$rs->free();
	$mysqli->close();
?>
