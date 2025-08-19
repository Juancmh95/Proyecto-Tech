// Contador total (no persistente)
let totalRegistrados = 0;

function registrar(e, nombreEventoOpcional) {
  e.preventDefault();

  const form = e.target;
  const card = form.closest('.voluntariado'); // la tarjeta del evento
  if (!card) return;

  const nombre = (form.nombre?.value || '').trim();
  const email  = (form.email?.value || '').trim();

  if (!nombre || !email) {
    alert('Por favor completa nombre y correo.');
    return;
  }

  // 1) Actualizar contador local de la tarjeta
  const spanLocal = card.querySelector('.count');
  if (spanLocal) {
    const actual = parseInt(spanLocal.textContent, 10) || 0;
    spanLocal.textContent = String(actual + 1);
  }

  // 2) Actualizar contador total
  const spanTotal = document.getElementById('totalCount');
  if (spanTotal) {
    const actualTotal = parseInt(spanTotal.textContent, 10) || 0;
    spanTotal.textContent = String(actualTotal + 1);
    totalRegistrados = actualTotal + 1;
  }

  // 3) Limpiar campos
  form.reset();

  // 4) Mensaje
  const tituloCard = card.querySelector('h2')?.textContent?.trim();
  const nombreEvento = nombreEventoOpcional || tituloCard || 'el voluntariado';
  alert(`¡Gracias por registrarte en "${nombreEvento}", ${nombre} (${email})!`);
}

// Mantener tu función irAIntro tal cual, solo más a prueba de fallos
function irAIntro(){
  const el = document.getElementById('totalCount');
  let total = 0;
  if (el) {
    total = parseInt(el.textContent, 10);
    if (isNaN(total)) total = 0;
  }
  location.href = 'intro.html?reg=' + String(total) + '&vis=0';
}
