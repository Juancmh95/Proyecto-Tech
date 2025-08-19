(function(){
  var params = new URLSearchParams(location.search);

  var totalInscritos = parseInt(params.get('reg'), 10);
  if (isNaN(totalInscritos)) totalInscritos = 0;

  var visitas = parseInt(params.get('vis'), 10);
  if (isNaN(visitas)) visitas = 0;
  visitas += 1;

  document.getElementById('regCount').textContent   = String(totalInscritos);
  document.getElementById('visitCount').textContent = String(visitas);

  params.set('reg', String(totalInscritos));
  params.set('vis', String(visitas));
  history.replaceState(null, '', location.pathname + '?' + params.toString());
})();
