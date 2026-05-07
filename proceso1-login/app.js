
// ===========================================
// APP.JS - Lógica de index.html (página principal)
// ===========================================

// ===========================================
// CONFIGURACIÓN INICIAL
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const hoy = obtenerFechaHoy();
        fechaInput.setAttribute('min', hoy);
        fechaInput.value = hoy;
    }
    cargarTema();
});

// ===========================================
// MANEJO DE MODALES
// ===========================================

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
    limpiarMensajes();
}

window.onclick = function(event) {
    const modales = document.querySelectorAll('.modal');
    modales.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            limpiarMensajes();
        }
    });
}

// ===========================================

function limpiarMensajes() {
    document.querySelectorAll('.mensaje').forEach(m => {
        m.style.display = 'none';
        m.className = 'mensaje';
    });
}

// ===========================================
// LOGIN GERENTE (desde modal index)
// ===========================================
