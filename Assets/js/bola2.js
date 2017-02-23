$(document).ready(function(){

var numBombo = new Array(90);

for (i = 0; i < numBombo.length; i++) { 
    numBombo[i]=i+1;
}
$('#Nuevo').click(function(){
	var datos={bombo:numBombo}
	$.post("Assets/js/bombo.php",datos,ProcesarRespuesta);
	return false;
 });
function ProcesarRespuesta(datos_devueltos)
{
	var aux=parseInt(datos_devueltos);
	$("#bombo").html(numBombo[aux]);
	numBombo.splice(aux,1);
		document.getElementById("demo").innerHTML = numBombo;
}

	});