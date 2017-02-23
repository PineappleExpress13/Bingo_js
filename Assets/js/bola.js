   
$(document).ready(function(){

	var numUsados = new Array(90);
	var numero=0;


$('#Nuevo').click(function(){
	var datos={usados:numUsados}
	$.post("Assets/js/bombo.php",datos,ProcesarRespuesta);
	return false;
 });

function ProcesarRespuesta(datos_devueltos)
{
	numero=parseInt(datos_devueltos);
	numUsados[numero]=true;
	$("#bombo").html("<p>"+numero+"</p>");
}
});

