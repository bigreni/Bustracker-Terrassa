var etEscollirLinia=" -- Seleccioni una línia -- "
var etEscollirSentit=" -- Seleccioni un sentit -- "
var etEscollirParada=" -- Seleccioni una parada  -- "
var etEscollirParadaOr=" -- Seleccioni una parada -- "
var etEscollirParadaDe=" -- Seleccioni una parada -- "
var etEscollirJornada=" -- Seleccioni una jornada -- "
var etLang="ca"
var etObre="Mostra articles"
var etTanca="Oculta articles"

function mostraAmaga(identificado){
	$('#'+identificado).slideToggle('fast', function() {
    // Animation complete.
  });

	
}

function updateLineaMenu(id_idLinia,id_idSentido,id_IdJornada,id_IdParada,BotonBuscar) {
	var val;
	valo = document.getElementById(id_idLinia).value;
	valores=valo.split("-");
	val=valores[0];
	idSentido=valores[1];
	//prompt("",'consultes.asp?proces=PassaLinea&idLinea='+val+'&idSentido='+idSentido);
	if( val > 0 ){
		$.ajax({
			url:	'http://www.tmesa.com/consultes.asp?nocache=' + Math.random(),
			type: 'POST',
			data: 'proces=PassaLinea&idLinea='+val+'&idSentido='+idSentido,
			dataType: 'text',
			success: function(respuesta) {
				var StrJornadas = respuesta.split("<");
				document.getElementById(id_IdJornada).innerHTML = "";
				document.getElementById(id_IdParada).innerHTML = "";
				if(id_IdParada == "IdParadaOr"){
					$('#'+id_IdParada).append('<option value="0" title="'+etEscollirParadaOr+'" selected>'+etEscollirParadaOr+'</option>');
					document.getElementById("IdParadaDe").innerHTML = "";
					$('#IdParadaDe').append('<option value="0" title="'+etEscollirParadaOr+'" selected>'+etEscollirParadaOr+'</option>');
				}
				else{
					if(id_IdParada == "IdParadaMenuQuan"){
						$('#'+id_IdParada).append('<option value="0" title="'+etEscollirParada+'" selected>'+etEscollirParada+'</option>');
						$('#'+id_IdJornada).append('<option value="0" title="'+etEscollirParada+'" selected>'+etEscollirParada+'</option>');
					}
					else{
						$('#'+id_IdParada).append('<option value="0" title="'+etEscollirParadaDe+'" selected>'+etEscollirParadaDe+'</option>');
						$('#'+id_IdJornada).append('<option value="0" title="'+etEscollirParadaDe+'" selected>'+etEscollirParadaDe+'</option>');
					}
				}
				for(i=0;i<StrJornadas.length;i++){
					if(StrJornadas[i] != ""){
						tupla=StrJornadas[i].split(">");
						id=tupla[0];
						id=id.replace(/ /g,"");
						nombre=tupla[1];
						nombre = nombre.replace("-"," > ");
						if(respuesta != ""){
							$('#'+id_IdParada).append('<option value="'+id+'" title="'+nombre+'"> '+nombre+'</option>');
						}
					}
				}
				document.getElementById(id_IdJornada).innerHTML = "";
				if(id_IdParada == "IdParadaMenuQuan"){
					$('#'+id_IdJornada).append('<option value="0" title="'+etEscollirParada+'" selected>'+etEscollirParada+'</option>');
				}
				else{
					$('#'+id_IdJornada).append('<option value="0" title="'+etEscollirParadaOr+'" selected>'+etEscollirParadaOr+'</option>');
				}
				ocultaBuscar(id_IdJornada,BotonBuscar);
				
			},
			error: function() {
				
			}
		});
	}
	else{
		document.getElementById(id_IdJornada).innerHTML = "";
		document.getElementById(id_idSentido).innerHTML = "";
		document.getElementById(id_IdParada).innerHTML = "";
		$('#'+id_IdJornada).append('<option value="0" title="'+etEscollirLinia+'" selected>'+etEscollirLinia+'</option>');
		$('#'+id_IdParada).append('<option value="0" title="'+etEscollirLinia+'" selected>'+etEscollirLinia+'</option>');
		ocultaBuscar(id_IdJornada,BotonBuscar);
	}
}

function updateJornadaMenu(id_idLinia,id_idSentido,id_IdJornada,id_IdParada,BotonBuscar) {
	var val, val2;
	val = document.getElementById(id_IdJornada).value;
	valo = document.getElementById(id_idLinia).value;
	valores=valo.split("-");
	val2=valores[1];
	if( val2 > 0 ){
		//prompt("",'consultes.asp?proces=PassaSentit&idSentit='+val2+'&idJornada='+val);
		$.ajax({
			url:	'http://www.tmesa.com/consultes.asp?nocache=' + Math.random(),
			type: 'POST',
			data: 'proces=PassaSentit&idSentit='+val2+'&idJornada='+val,
			dataType: 'text',
			success: function(respuesta) {
				//alert(respuesta);
				var StrSentidos = respuesta.split("<");
				document.getElementById(id_IdParada).innerHTML = "";
				$('#'+id_IdParada).append('<option value="0" title="'+etEscollirParadaOr+'" selected> '+etEscollirParadaOr+'</option>');
				for(i=0;i<StrSentidos.length;i++){
					if(StrSentidos[i] != ""){
						tupla=StrSentidos[i].split(">");
						id=tupla[0];
						nombre=tupla[1];
						if(nombre != null)
							nombre = nombre.replace("-"," > ");
						if(respuesta != ""){
							$('#'+id_IdParada).append('<option value="'+id+'" title="'+nombre+'"> '+nombre+'</option>');
						}
					}
				}
				ocultaBuscar(id_IdJornada,BotonBuscar);
			},
			error: function() {
				
			}
		});
	}
	else{
		document.getElementById(id_IdParada).innerHTML = "";
		$('#'+id_IdParada).append('<option value="0" title="'+etEscollirLinia+'" selected> '+etEscollirLinia+'</option>');
		ocultaBuscar(id_IdJornada,BotonBuscar);
	}
}
		
function updateSentidoMenu(id_idLinia,id_idSentido,id_IdJornada,id_IdParada,BotonBuscar) {
	var val, val2;
	val = document.getElementById(id_IdJornada).value;
	val2 = document.getElementById(id_idSentido).value;
	if( val2 > 0 ){
		//prompt("",'consultes.asp?proces=PassaSentit&idSentit='+val2+'&idJornada='+val);
		$.ajax({
			url:	'http://www.tmesa.com/consultes.asp?nocache=' + Math.random(),
			type: 'POST',
			data: 'proces=PassaSentit&idSentit='+val2+'&idJornada='+val,
			dataType: 'text',
			success: function(respuesta) {
				//alert(respuesta);
				var StrSentidos = respuesta.split("<");
				document.getElementById(id_IdParada).innerHTML = "";
				$('#'+id_IdParada).append('<option value="0" title="'+etEscollirParadaOr+'" selected> '+etEscollirParadaOr+'</option>');
				for(i=0;i<StrSentidos.length;i++){
					if(StrSentidos[i] != ""){
						tupla=StrSentidos[i].split(">");
						id=tupla[0];
						nombre=tupla[1];
						if(nombre != null)
							nombre = nombre.replace("-"," > ");
						if(respuesta != ""){
							$('#'+id_IdParada).append('<option value="'+id+'" title="'+nombre+'"> '+nombre+'</option>');
						}
					}
				}
				ocultaBuscar(id_IdJornada,BotonBuscar);
			},
			error: function() {
				
			}
		});
	}
	else{
		document.getElementById(id_IdParada).innerHTML = "";
		$('#'+id_IdParada).append('<option value="0" title="'+etEscollirLinia+'" selected> '+etEscollirLinia+'</option>');
		ocultaBuscar(id_IdJornada,BotonBuscar);
	}
}
function paradaSeleccionada(id_idLinia,id_idSentido,id_IdJornada,id_IdParada,BotonBuscar){
	IdParada = document.getElementById(id_IdParada).value;
	valo = document.getElementById(id_idLinia).value;
	valores=valo.split("-");
	idLinia=valores[0];
	idSentido=valores[1];
	//ocultaBuscar(id_IdParada,BotonBuscar);
	$('#linkHorariLinea').attr("href","http://www.tmesa.com/horarisTaula.asp?idParada="+IdParada+"&idSentido="+idSentido+"&lang="+etLang);	
}

function lanzahorario(){
		var objLink = document.getElementById('linkHorariLinea');
    myLytebox.start(objLink, false, true); 
}

function updateJornadaMenu2(id_idLinia,id_idSentido,id_IdJornada,id_IdParada,BotonBuscar) {
	IdParada = document.getElementById(id_IdParada).value;
	idJornada = document.getElementById(id_IdJornada).value;
	valo = document.getElementById(id_idLinia).value;
	valores=valo.split("-");
	idLinia=valores[0];
	//alert(valores[1]);
	idSentido=valores[1];
	if(BotonBuscar=="BotonBuscar2") ocultaBuscar(id_IdJornada,BotonBuscar);
	if(BotonBuscar=="BotonBuscar3") calcula();
	//alert("horarisTaula.asp?idParada="+IdParada+"&idSentido="+idSentido+"&lang="+etLang+"&tipoCons=menuEsq");	
	$('#linkHorariLinea').attr("href","http://www.tmesa.com/horarisTaula.asp?idJornada="+idJornada+"&idParada="+IdParada+"&idSentido="+idSentido+"&lang="+etLang+"&tipoCons=menuEsq");	
	if(BotonBuscar=="ConsultaHoraris") lanzahorario();
}
function paradaSeleccionada2(id_idLinia,id_idSentido,id_IdJornada,id_IdParada,BotonBuscar,pLang){
	var val, val2;
	valParada = document.getElementById(id_IdParada).value;
	valo = document.getElementById(id_idLinia).value;
	valores=valo.split("-");
	val=valores[0];
	idSentido=valores[1];
	if( idSentido > 0 ){
		//prompt("",'consultes.asp?proces=obteJornades&idSentit='+idSentido+'&parada='+valParada+'&idLinea='+val+'&idioma='+pLang);
		$.ajax({
			url:	'http://www.tmesa.com/consultes.asp?nocache=' + Math.random(),
			type: 'POST',
			data: 'proces=obteJornades&idSentit='+idSentido+'&parada='+valParada+'&idLinea='+val+'&idioma='+pLang,
			dataType: 'text',
			success: function(respuesta) {
				var StrSentidos = respuesta.split("<");
				var valJornadaSel = document.getElementById(id_IdJornada).options[document.getElementById(id_IdJornada).selectedIndex].value;
				var escollit="";
				document.getElementById(id_IdJornada).innerHTML = "";
				$('#'+id_IdJornada).append('<option value="0" title="'+etEscollirJornada+'" selected> '+etEscollirJornada+'</option>');
				for(i=0;i<StrSentidos.length;i++){
					if(StrSentidos[i] != ""){
						tupla=StrSentidos[i].split(">");
						id=tupla[0];
						if(id == valJornadaSel)
							escollit="selected";
						nombre=tupla[1];
						if(nombre != null)
							nombre = nombre.replace("-"," > ");
						if(respuesta != ""){
							$('#'+id_IdJornada).append('<option value="'+id+'" title="'+nombre+'" '+escollit+' > '+nombre+'</option>');
						}
						escollit="";
					}
				}
				if(id_IdJornada=="IdJornada" && valJornadaSel != "0"){
					updateJornadaMenu2('IdLinea','IdSentido','IdJornada','IdParadaOr','BotonBuscar3');
				}
				else{
					if(id_IdJornada=="IdJornadaMenuHorari" && valJornadaSel != "0"){
						updateJornadaMenu2('IdLineaMenuHorari','IdSentidoMenuHorari','IdJornadaMenuHorari','IdParadaMenuHorari','ConsultaHoraris');
					}
					else{
						ocultaBuscar(id_IdJornada,BotonBuscar);
					}
				}
			},
			error: function() {
				
			}
		});
	}
	else{
		document.getElementById(id_IdJornada).innerHTML = "";
		$('#'+id_IdJornada).append('<option value="0" title="'+etEscollirJornada+'" selected> '+etEscollirJornada+'</option>');
		ocultaBuscar(id_IdJornada,BotonBuscar);
	}
}
function paradaSeleccionada2Origen(id_idLinia,id_idSentido,id_IdJornada,id_IdParada,BotonBuscar,pLang){
	var val;
	valo = document.getElementById(id_idLinia).value;
	valores=valo.split("-");
	val=valores[0];
	idSentido=valores[1];
	if(id_IdParada != "IdParadaOr")
		parOrVal=document.getElementById("IdParadaOr").options[document.getElementById("IdParadaOr").selectedIndex].value;
	//prompt("",'consultes.asp?proces=PassaLinea&idLinea='+val+'&idSentido='+idSentido+'&calcul='+parOrVal);
	if( val > 0 ){
		$.ajax({
			url:	'http://www.tmesa.com/consultes.asp?nocache=' + Math.random(),
			type: 'POST',
			data: 'proces=PassaLinea&idLinea='+val+'&idSentido='+idSentido+'&calcul='+parOrVal,
			dataType: 'text',
			success: function(respuesta) {
				var StrJornadas = respuesta.split("<");
				document.getElementById(id_IdJornada).innerHTML = "";
				document.getElementById(id_IdParada).innerHTML = "";
				if(id_IdParada == "IdParadaOr"){
					$('#'+id_IdParada).append('<option value="0" title="'+etEscollirParadaOr+'" selected>'+etEscollirParadaOr+'</option>');
				}
				else{
					if(id_IdParada == "IdParadaMenuQuan"){
						$('#'+id_IdParada).append('<option value="0" title="'+etEscollirParada+'" selected>'+etEscollirParada+'</option>');
					}
					else{
						$('#'+id_IdParada).append('<option value="0" title="'+etEscollirParadaDe+'" selected>'+etEscollirParadaDe+'</option>');
					}
				}
				if(respuesta != ""){
					for(i=0;i<StrJornadas.length;i++){
						if(StrJornadas[i] != ""){
							tupla=StrJornadas[i].split(">");
							id=tupla[0];
							nombre=tupla[1];
							nombre = nombre.replace("-"," > ");
							if(respuesta != ""){
								$('#'+id_IdParada).append('<option value="'+id+'" title="'+nombre+'"> '+nombre+'</option>');
							}
						}
					}
				}
				document.getElementById(id_IdJornada).innerHTML = "";
				$('#'+id_IdJornada).append('<option value="0" title="'+etEscollirParadaDe+'" selected>'+etEscollirParadaDe+'</option>');
				ocultaBuscar(id_IdJornada,BotonBuscar);
				
			},
			error: function() {
				
			}
		});
	}
	else{
		document.getElementById(id_IdJornada).innerHTML = "";
		document.getElementById(id_idSentido).innerHTML = "";
		document.getElementById(id_IdParada).innerHTML = "";
		$('#'+id_IdJornada).append('<option value="0" title="'+etEscollirLinia+'" selected>'+etEscollirLinia+'</option>');
		$('#'+id_IdParada).append('<option value="0" title="'+etEscollirLinia+'" selected>'+etEscollirLinia+'</option>');
		ocultaBuscar(id_IdParada,BotonBuscar);
	}
}

function ocultaBuscar(valor,campo){
	if(campo!=""){
		idJornada = document.getElementById(valor).value;
		if(idJornada!="0"){
			//$("#"+campo).fadeIn('slow');
			obtenerProximas('IdLineaMenuQuan','IdSentidoMenuQuan','IdJornadaMenuQuan','IdParadaMenuQuan','BotonBuscar2');
		}else{
			$("#"+campo).fadeOut('slow');
		}
	}
}


function obtenerProximas(id_idLinia,id_idSentido,id_IdJornada,id_IdParada){
	valo = document.getElementById(id_idLinia).value;
	IdJornada2 = document.getElementById(id_IdJornada).value;
	NomParada = document.getElementById(id_IdParada).value;
	NomParada = NomParada.replace(/ /g,"-|-");
	valo = document.getElementById(id_idLinia).value;
	valores=valo.split("-");
	idLinia=valores[0];
	idSentido=valores[1];
	
	//prompt("",'consultes.asp?proces=ConsultarProximos&idLinia='+idLinia+'&idSentido='+idSentido+'&IdJornada='+IdJornada2+'&NomParada='+NomParada);
	$.ajax({
		url:	'http://www.tmesa.com/consultes.asp?nocache=' + Math.random(),
		type: 'POST',
		data: 'proces=ConsultarProximos&idLinia='+idLinia+'&idSentido='+idSentido+'&IdJornada='+IdJornada2+'&NomParada='+NomParada,
		dataType: 'text',
		success: function(respuesta) {
            $('tr[esconder="true"]').css("display","none");
            $('#taulaInfo').html(StrRespuesta);
			$('tr[esconder="false"]').css("display","block");
		},
		error: function() {
			alert("error");
		}
	});
}

function torna(){
	$('tr[esconder="true"]').css("display","block");
	$('#taulaInfo').html("");
	$('tr[esconder="false"]').css("display","none");
	
}

function resalta(){
	$('#Enrera').addClass("textBold");
}

function Noresalta(){
	$('#Enrera').removeClass("textBold");
}

