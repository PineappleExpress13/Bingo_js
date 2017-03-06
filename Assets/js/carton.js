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
        $numBombo: Es el bombo en si,guarda todos los posibles números.
        $rival: Es un array de arrays que guardará los cartones de los rivales
        $apuesta: Almacena la apuesta realizada antes de empezar la partida
   	*/
    var usados = new Array(27);
    var arrayBase = new Array(0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8);
    var numero = 0;
    var base = 0;
    var hueco= 0;
    var baseHueco = 0;
    var huecosUsados = new Array(27);
    var rutaImagen= "Assets/src/hueco.jpg"
    var numBombo = new Array(90);
    var usadosRival = new Array(15);
    var rival = new Array(20);
    var apuesta =0;
    var numSalidos = new Array();
    var numJugadores = 0;
    var timer;


    for (i = 0; i < numBombo.length; i++) {
    numBombo[i]=i+1;
    }

    $('#juego').toggle();


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

    function Bola()
    {
        var datos={bombo:numBombo}
        $.post("Assets/js/bombo.php",datos,ProcesarRespuesta);
    }

    function ProcesarRespuesta(datos_devueltos)
    {
    var aux=parseInt(datos_devueltos);
    $("#bombo").html(numBombo[aux]);//
    numSalidos.push(numBombo[aux]);
    ComprobarBingoRivales();
    numBombo.splice(aux,1);
    }


    function GenerarRivales(num)
    {
        for (var i = 0; i < num; i++)
        {
            rival[i]= new Array(15);
         for(var j = 0; j<15; j++){
            AsignarNumRival(i,j);
            }
            var auxiliar=usadosRival.length-1;
            usadosRival.splice(0,auxiliar);
        }
    }

    function AsignarNumRival(i,j)
    {
        var num=Math.floor(Math.random()*90);

        if(num==0)
        {
            AsignarNumRival(i,j);
        }
        if(usadosRival[num] != true){
            rival[i][j]=num;
            usadosRival[num] = true;
        }else{
            AsignarNumRival(i,j);
        }
    }

    function ComprobarBingoRivales()
    {
      if(numSalidos.length>14)
      {
        for(var i=0;i<parseInt($('#jugadores').val());i++)
        {
          match=0;
          for(var j = 0;j<numSalidos.length;j++)
          {
            for(var k=0;k<15;k++)
            {

              if(numSalidos[j] == rival[i][k] )
              {
                match++;
              }
            }
          }
          if(match==15)
          {
            alert('Bingo!!\nGana la casa,siga probando!\nRefresque la página para una nueva partida');
            $('#juego').toggle();
            clearInterval(timer);
          }

        }
      }
    }

    $('#btnbingo').click(function(){
      if(numSalidos.length<15)
      {
        alert('Es imposible que tenga bingo aún');
      }
      else {
        match=0;
        for(var i = 0;i<numSalidos.length;i++)
        {
          for(var j=0;j<27;j++)
          {
            var helper = parseInt($('#numero'+j).html());
            if(numSalidos[i] == helper)
            {
              match++;
            }
          }
        }
        if(match==15)
          {
            var premio = Math.round(0.80*(numJugadores*apuesta/1));
            alert('Bingo!!\nSu premio es de :' + premio + '€\nRefresque la página si quiere volver a jugar');
            $('#juego').toggle();
            clearInterval(timer);
          }
          else {
            alert('Bingo fallido,continue jugando');
          }
      }

        return false;
    });



    $('td').click(function(){

        var estilo = this.style;
        estilo.backgroundColor = estilo.backgroundColor? "":"#DF0101";
    });

    $('#iniciar').click(function(){
            $('#iniciar').attr('disabled',true);
            Iniciar();
            $('#juego').toggle();
            timer = setInterval(Bola,5000);
            GenerarRivales($("#jugadores").val());
            apuesta = $("#apuesta option:selected").text();
            numJugadores = parseInt($('#jugadores').val());
            return false;
    });
    $('#apuesta').change(function(){
        apuesta=$('#apuesta option:selected').val();
    });



});
