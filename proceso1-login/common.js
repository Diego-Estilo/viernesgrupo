
// ===========================================
// COMMON.JS - Funciones compartidas
// ===========================================

// ===========================================
// UTILIDADES
// ===========================================

function obtenerFechaHoy() {
    const hoy = new Date();
    return `${hoy.getFullYear()}-${String(hoy.getMonth()+1).padStart(2,'0')}-${String(hoy.getDate()).padStart(2,'0')}`;
}

function logout() {
    sessionStorage.clear();
    localStorage.removeItem('ubicacion_empleado');
    window.location.href = 'index.html';
}

function obtenerAnoMesActual() {
    const hoy = new Date();
    return [hoy.getFullYear().toString(), String(hoy.getMonth()+1).padStart(2, '0')];
}

function formatearHora(fechaISO) {
    if (!fechaISO) return '--:--';
    const d = new Date(fechaISO);
    return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function formatearFecha(fecha) {
    if (!fecha) return '--';
    return new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ===========================================
// MENSAJES
// ===========================================

function mostrarMensaje(texto, tipo) {
    const el = document.getElementById('mensaje');
    if (el) {
        el.textContent = texto;
        el.className = 'mensaje ' + tipo;
        el.style.display = 'block';
        setTimeout(() => { el.style.display = 'none'; }, 5000);
    }
}

function mostrarMensajeElemento(elementId, texto, tipo) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.textContent = texto;
        elemento.className = 'mensaje ' + tipo;
        elemento.style.display = 'block';
        setTimeout(() => { elemento.style.display = 'none'; }, 5000);
    }
}

// Manejo Global de Modales
function openModal(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===========================================
// TEMA
// ===========================================

function toggleTema() {
    const body = document.body;
    const btn = document.getElementById('btnTema');
    body.classList.toggle('modo-oscuro');
    if (body.classList.contains('modo-oscuro')) {
        if (btn) btn.innerHTML = '☀️';
        localStorage.setItem('tema', 'oscuro');
    } else {
        if (btn) btn.innerHTML = '🌙';
        localStorage.setItem('tema', 'claro');
    }
}

function cargarTema() {
    const tema = localStorage.getItem('tema');
    const btn = document.getElementById('btnTema');
    if (tema === 'oscuro') {
        document.body.classList.add('modo-oscuro');
        if (btn) btn.innerHTML = '☀️';
    }
}
