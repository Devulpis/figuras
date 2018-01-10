llenas = ['cuadrado fa-square fa', 'circulo fa-circle fa', 'usuario fa-user fa', 'estrella fa-star fa'];
vacias = ['cuadrado fa-square-o fa', 'circulo fa-circle-thin fa', 'usuario fa-user-o fa', 'estrella fa-star-o fa'];

$(document).ready(function(){
	generar_figuras();

	$('#btn_nueva_partida').on('click', nueva_partida);
});

function nueva_partida() {
	//Vaciamos los contenedores de las figuras.
	$('#contenedor_llenas').html('');
	$('#contenedor_vacias').html('');

	//Volvemos a generar las figuras
	generar_figuras();
}

function verificar_victoria() {
	if ($('.invisible').length === llenas.length) {
		$('#mensaje_victoria').dialog({
		show: {effect: 'scale', duration: 400},
		hide: {effect: 'explode', duration: 400},
		modal: true,
		buttons: {
			'Comenzar otra partida': function () {
					nueva_partida();
					$(this).dialog('close');
				},
			'Vale': function () {
				$(this).dialog('close');
			}
		}
	});
	}
}

/**
* Función que genera las figuras con las que el usuario juega.
* Por cada uno de los elementos del array de figuras llenas se genera un número aleatorio.
* que definen el par de figuras (llena y vacía) y el color que se le da a la que hay que rellenar, respectivamente.
* 
* 
*/
function generar_figuras() {
	var llenas = ['cuadrado fa-square fa', 'circulo fa-circle fa', 'usuario fa-user fa', 'estrella fa-star fa'],
		vacias = ['cuadrado fa-square-o fa', 'circulo fa-circle-thin fa', 'usuario fa-user-o fa', 'estrella fa-star-o fa'],
		cont = 0, colores = ['rojo', 'amarillo', 'azul', 'verde'];

	while (llenas.length !== 0) {
		let indice_llenas = aleatorio(0, llenas.length - 1),
			indice_vacias = aleatorio(0, vacias.length - 1),
			indice_colores = aleatorio(0, colores.length - 1),
			$figura_llena = $('<i class="' + llenas[indice_llenas] + ' figura gris extra-grande" aria-hidden="true"></i>');
			$figura_vacia = $('<i class="' + vacias[indice_vacias] + ' figura ' + colores[indice_colores] + ' extra-grande" aria-hidden="true"></i>');
		
		$figura_llena.draggable({
			revert: true,
			start: function () {
				$(this).toggleClass('agarrado');
			},
			stop: function () {
				$(this).toggleClass('agarrado');
			}
		});

		$figura_vacia.droppable({
			drop: function (event, ui) {
				var clases_vacia = $(this).attr('class').split(' '),
					clases_llena = ui.draggable.attr('class').split(' ');

				if (clases_vacia[0] === clases_llena[0]) {
					ui.draggable.toggleClass('invisible');

					$(this).toggleClass(clases_vacia[1])
						.addClass(clases_llena[1]);

					verificar_victoria();
				}
			}
		});

		$('#contenedor_llenas').append($figura_llena);
		$('#contenedor_vacias').append($figura_vacia);

		llenas.splice(indice_llenas, 1);
		vacias.splice(indice_vacias, 1);
		colores.splice(indice_colores, 1);
	}
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}