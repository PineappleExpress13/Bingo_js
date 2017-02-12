/*var carton = new array();


function GenerarNumeros()
{
  for(var c = 0; x < 9; c++)
  {
    carton[c] = new array(3);
    for(var f = 0; x < 3; f++)
    {
      
    }
  }
}*/
$(document).ready(function(){
   	/*
		$Usados:Array que contiene los numeros que ya se han asignado para que no se repitan
		$arrayBase: guarda las bases para los aleatorios según su posición en la tabla
		$numero: Es el numero que aparecerá en el cartón
		$base: Es la base que se usará para el número
        $hueco: Guarda el número de huecos que ya existe en cada línea
        $baseHueco: Es la base de la posición del hueco
        $huecosUsados: Array que guarda las posiciones de los huecos para no repetir
        $rutaImagen: Ruta de la imagen que se muestra en los huecos
   	*/
    var usados = new Array(27);
    var arrayBase = new Array(0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8);
    var numero = 0;
    var base = 0;
    var hueco= 0;
    var baseHueco = 0;
    var huecosUsados = new Array(27);
    var rutaImagen= "Assets/src/hueco.jpg"
 
   
    Iniciar();
   
   /*
	Asigna un número a cada td.
   */
    function Iniciar(){
        for(var i = 0; i<27; i++){
            AsginarNum(i);
            if(i==8 || i==17 || i==26)
            {
                while(hueco!=4){
                AsignaHuecos(i);    
                }
                hueco=0;
            }
 
        }
    }
	 /*
	 Genera un número aleatorio en función de la posición en la tabla que se le pase comprobando que no se repita
	 @i : Posición en la tabla
	 */
    function AsginarNum(i){
        base = arrayBase[i] * 10;
        if(i==8 || i==17 || i==26)
        	numero = base + Math.floor(Math.random()*11);
        else
        numero = base + Math.floor(Math.random()*10);
		 
		
		if(numero==0)
		{
			AsginarNum(i);
		} 
        if(usados[numero] != true){
            $('#numero'+i).html(numero);
            usados[numero] = true;
        }else{
            AsginarNum(i);
        }

    }
	 /*
	 Resetea todos los numeros usados y todos los huecos
	 */
    function Resetear(){
        for(var j = 0; j < usados.length; j++){
            usados[j] = false;
            huecosUsados[j] = false;
        }
    }
    /*
    Asigna a una posición como "hueco" ocultando su número e incluyendo la imagen proporcionada en la practica
    */
    function AsignaHuecos(i)
    {
        baseHueco = i-8;
        var pos = baseHueco + Math.floor(Math.random()*9);
        if(huecosUsados[pos]!=true)
        {
            $('#numero'+pos).html('<img src="'+rutaImagen+'" id="hueco">');
            huecosUsados[pos]=true;
            hueco++;
        }
        else
            AsignaHuecos(i);
    }
	 
	 
    $('#Nuevo').click(function(){
        Resetear();
        Iniciar();
    });
	 
    $('td').click(function(){
		
        var estilo = this.style;
        estilo.backgroundColor = estilo.backgroundColor? "":"#DF0101";
    });

});

