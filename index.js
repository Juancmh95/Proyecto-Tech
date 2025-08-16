/**
 * - Formulario único con selector (actualiza título, fecha, lugar y contador local).
 * - Modal informativo por cada card (abre/cierra con click, overlay, botón o ESC).
 * - Contador total se mantiene como antes (no persistente).
 */

/* ====== Catálogo de eventos ====== */
const EVENTS = {
  recoleccion: {
    nombre: 'Recolección de alimentos',
    fecha: '10/08/2025',
    lugar: 'Parque del Poblado'
  },
  limpieza: {
    nombre: 'Limpieza de la quebrada ayura',
    fecha: '15/08/2025',
    lugar: 'Parque ecologico envigado'
  },
  cocinando: {
    nombre: 'Cocinando por Medellín',
    fecha: '20/08/2025',
    lugar: 'Parque de las luces'
  },
  adopcion: {
    nombre: 'Jornada de adopción de mascotas',
    fecha: '25/08/2025',
    lugar: 'La perla'
  }
};

/* ====== Contadores por evento (en memoria) ====== */
const countsPorEvento = {
  recoleccion: 0,
  limpieza: 0,
  cocinando: 0,
  adopcion: 0
};

/* ====== Contenidos del modal por card ====== */
const CARD_INFO = {
  social: {
    titulo: 'Voluntariado Social',
    html: `
      <p>Colabora con comunidades vulnerables a través de jornadas de acompañamiento, donaciones y talleres.</p>
      <ul>
        <li>Entrega y clasificación de ayudas.</li>
        <li>Acompañamiento a población mayor e infancia.</li>
        <li>Actividades lúdicas y recreativas.</li>
      </ul>
    `
  },
  ambiental: {
    titulo: 'Voluntariado Ambiental',
    html: `
      <p>Participa en acciones para proteger el medio ambiente y promover hábitos sostenibles.</p>
      <ul>
        <li>Jornadas de limpieza y reciclaje.</li>
        <li>Siembra y mantenimiento de árboles.</li>
        <li>Educación ambiental en barrios y escuelas.</li>
      </ul>
    `
  },
  educativo: {
    titulo: 'Voluntariado Educativo',
    html: `
      <p>Apoya procesos educativos mediante tutorías, alfabetización y formación en habilidades.</p>
      <ul>
        <li>Refuerzo escolar y preparación de pruebas.</li>
        <li>Alfabetización digital.</li>
        <li>Talleres de lectura y escritura.</li>
      </ul>
    `
  },
  salud: {
    titulo: 'Voluntariado en Salud',
    html: `
      <p>Ayuda en campañas de promoción y prevención con enfoque comunitario.</p>
      <ul>
        <li>Jornadas de control y educación en hábitos saludables.</li>
        <li>Apoyo logístico en brigadas de salud.</li>
        <li>Actividades de actividad física y bienestar.</li>
      </ul>
    `
  }
};

document.addEventListener('DOMContentLoaded', () => {
  /* ====== Render del formulario según el select ====== */
  const selector = document.getElementById('selectorEvento');
  const titulo = document.getElementById('eventoTitulo');
  const fecha = document.getElementById('eventoFecha');
  const lugar = document.getElementById('eventoLugar');
  const countLocal = document.getElementById('eventoCount');

  function renderEvento(key) {
    const ev = EVENTS[key];
    if (!ev) return;
    titulo.textContent = ev.nombre;
    fecha.textContent = ev.fecha;
    lugar.textContent = ev.lugar;
    countLocal.textContent = String(countsPorEvento[key] || 0);
  }

  renderEvento(selector.value);
  selector.addEventListener('change', () => renderEvento(selector.value));

  /* ====== Modal: wiring ====== */
  const overlay = document.getElementById('card-overlay');
  const modal = document.getElementById('card-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const modalOk = document.getElementById('modal-ok');

  let lastTrigger = null;   // para devolver el foco al cerrar
  let currentKey = null;    // card abierta

  function openModal(key, triggerEl) {
    const info = CARD_INFO[key];
    if (!info) return;

    // si ya está abierta con la misma key, cerrar 
    if (currentKey === key && !modal.hidden) {
      closeModal();
      return;
    }

    currentKey = key;
    lastTrigger = triggerEl || null;

    modalTitle.textContent = info.titulo;
    modalBody.innerHTML = info.html;

    overlay.hidden = false;
    modal.hidden = false;

    // forzar animación
    requestAnimationFrame(() => modal.classList.add('show'));

    // foco al botón cerrar
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('show');
    // esperar transición corta antes de ocultar
    setTimeout(() => {
      overlay.hidden = true;
      modal.hidden = true;
      currentKey = null;
      if (lastTrigger) lastTrigger.focus();
    }, 160);
  }

  // Click en cards 
  document.querySelectorAll('.card[data-key]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.key, card));
    card.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        openModal(card.dataset.key, card);
      }
    });
  });

  // Cerrar por overlay, botones y ESC
  overlay.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  modalOk.addEventListener('click', closeModal);
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && !modal.hidden) closeModal();
  });
});

/* ====== Envío del formulario ====== */
function registrar(e) {
  e.preventDefault();

  const form = e.target;
  const selector = document.getElementById('selectorEvento');
  const key = selector.value;
  const evento = EVENTS[key];

  const nombre = (form.nombre?.value || '').trim();
  const email  = (form.email?.value || '').trim();

  if (!nombre || !email) {
    alert('Por favor completa nombre y correo.');
    return;
  }

  // Incrementar contador local
  countsPorEvento[key] = (countsPorEvento[key] || 0) + 1;
  document.getElementById('eventoCount').textContent = String(countsPorEvento[key]);

  // Incrementar contador total
  const spanTotal = document.getElementById('totalCount');
  const actualTotal = parseInt(spanTotal.textContent, 10) || 0;
  spanTotal.textContent = String(actualTotal + 1);

  // Limpiar campos
  form.nombre.value = '';
  form.email.value = '';

  alert(`¡Gracias por registrarte en "${evento.nombre}", ${nombre} (${email})!`);
}

/* ====== Navegar a la intro con el total visible ====== */
function irAIntro(){
  const el = document.getElementById('totalCount');
  let total = 0;
  if (el) {
    total = parseInt(el.textContent, 10);
    if (isNaN(total)) total = 0;
  }
  location.href = 'intro.html?reg=' + String(total) + '&vis=0';
}
