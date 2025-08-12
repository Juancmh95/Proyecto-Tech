// intro.js
// -------------------------------------------------------
// Objetivo: imprimircontadores en la intro
// "reg" llega por query string desde index.html
// "vis" se incrementa cada vez que abres esta página


(function(){
  // Lee parámetros de la URL qeu ya teniamos
  var params = new URLSearchParams(location.search);

  // Total inscritos
  var totalInscritos = parseInt(params.get('reg'), 10);
  if (isNaN(totalInscritos)) totalInscritos = 0;

  // Visitas: tomar ?vis (si existe), sumar 1 y mostrarlo
  var visitas = parseInt(params.get('vis'), 10);
  if (isNaN(visitas)) visitas = 0;
  visitas += 1;

  // PImprime valores en pantalla
  document.getElementById('regCount').textContent   = String(totalInscritos);
  document.getElementById('visitCount').textContent = String(visitas);

  // Actualizar la barra de direcciones con los valores actuales (sin recargar)
  params.set('reg', String(totalInscritos));
  params.set('vis', String(visitas));
  history.replaceState(null, '', location.pathname + '?' + params.toString());
})();
