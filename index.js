/**
Función manejadora del submit de cada formulario de voluntariado.
Esta evita que la página se recargue y Lee los datos del formulario (nombre y email).
Incrementa el contador local (de la tarjeta) y el contador total.
Limpia el formulario y muestra un aviso.
 @param {SubmitEvent} e - evento de envío del formulario
 @param {string} nombreEvento - nombre del voluntariado (solo para el mensaje)
 */
function registrar(e, nombreEvento) {
  // 1) Evitar recarga de la página y asi perdamos nuestros conteos y registros
  e.preventDefault();

  // 2) Toma el formulario que lanzó el submit
  var form = e.target;

  // 3) Lee valores (nombre y email)
  var nombre = form.nombre.value;
  var email  = form.email.value;

  // 4) Busca el contenedor del voluntariado (div.voluntariado)
  var tarjeta = form.parentElement; 

  // 5) Dentro de esa tarjeta, seleccionamos elcontador local
  var spanLocal = tarjeta.querySelector('.count');

  // 6) Tomamos el valor actual del contador local y sumamos  1 y reescribirmos
  var actualLocal = parseInt(spanLocal.textContent, 10);
  var nuevoLocal  = actualLocal + 1;
  spanLocal.textContent = nuevoLocal; // actualizamos el contador visible

  // 7) Actualizamos el contador total (span con id="totalCount")
  var spanTotal  = document.getElementById('totalCount');
  var actualTotal = parseInt(spanTotal.textContent, 10);
  var nuevoTotal  = actualTotal + 1;
  spanTotal.textContent = nuevoTotal; // actualizamos el contador visible

  // 8) Limpiar el formulario para que quede listo para otro registro
  form.reset();

  // 9) Aviso de confirmación simple (opcional)
  alert('¡Gracias por registrarte en "' + nombreEvento + '", ' + nombre + ' (' + email + ')!');

}

