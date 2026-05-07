/**
 * script.js - Lógica centralizada del Sistema de Asistencia
 */

document.addEventListener('DOMContentLoaded', () => {
    initTema();
    initReloj();
    initFormAsistencia();
});

// ===========================================
// GESTIÓN DE TEMA (CLARO/OSCURO)
// ===========================================
function toggleTema() {
    const body = document.body;
    const btn = document.getElementById('btnTema');
    
    body.classList.toggle('modo-oscuro');
    
    const esOscuro = body.classList.contains('modo-oscuro');
    if (btn) btn.innerHTML = esOscuro ? '☀️' : '🌙';
    localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
}

function initTema() {
    const temaGuardado = localStorage.getItem('tema');
    const btn = document.getElementById('btnTema');
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('modo-oscuro');
        if (btn) btn.innerHTML = '☀️';
    }
}

// ===========================================
// RELOJ EN TIEMPO REAL
// ===========================================
function initReloj() {
    const relojEl = document.getElementById('reloj');
    const fechaEl = document.getElementById('fecha');
    const horaActualEl = document.getElementById('horaActual'); // Para registro_empleado

    if (!relojEl && !horaActualEl) return;

    const actualizar = () => {
        const ahora = new Date();
        
        // Formato Hora
        let h = ahora.getHours();
        const m = ahora.getMinutes().toString().padStart(2, '0');
        const s = ahora.getSeconds().toString().padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        const horaStr = `${h.toString().padStart(2, '0')}:${m}:${s} ${ampm}`;

        if (relojEl) relojEl.textContent = horaStr;
        if (horaActualEl) horaActualEl.textContent = horaStr;

        // Formato Fecha
        if (fechaEl) {
            const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            fechaEl.textContent = ahora.toLocaleDateString('es-ES', opciones);
        }
    };

    setInterval(actualizar, 1000);
    actualizar();
}

// ===========================================
// GEOLOCALIZACIÓN
// ===========================================
async function obtenerUbicacion() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocalización no soportada");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
                // Guardar en sesión para persistencia entre páginas
                sessionStorage.setItem('latitud_registro', coords.lat);
                sessionStorage.setItem('longitud_registro', coords.lon);
                resolve(coords);
            },
            (err) => reject(err.message),
            { enableHighAccuracy: true, timeout: 5000 }
        );
    });
}

// ===========================================
// UTILIDADES DE FORMULARIO
// ===========================================
function checkNuevoDepartamento() {
    const select = document.getElementById('departamentoSelect');
    const checkbox = document.getElementById('checkNuevoDepto');
    const divNuevo = document.getElementById('nuevoDepartamentoDiv');
    
    if (select && select.value === 'otro') {
        if (checkbox) checkbox.checked = true;
        if (divNuevo) divNuevo.style.display = 'block';
    }
}

function toggleNuevoDepartamento() {
    const checkbox = document.getElementById('checkNuevoDepto');
    const divNuevo = document.getElementById('nuevoDepartamentoDiv');
    const select = document.getElementById('departamentoSelect');
    
    const isChecked = checkbox.checked;
    if (divNuevo) divNuevo.style.display = isChecked ? 'block' : 'none';
    if (select) select.disabled = isChecked;
}

// ===========================================
// LÓGICA DE REGISTRO
// ===========================================

function abrirModalRegistro(tipo) {
    const modal = document.getElementById('modalAsistente');
    if (modal) {
        openModal('modalAsistente');
        
        // Seleccionar tipo automáticamente
        if (tipo === 'entrada') {
            const radio = document.getElementById('regEntrada');
            if (radio) radio.checked = true;
        } else if (tipo === 'salida') {
            const radio = document.getElementById('regSalida');
            if (radio) radio.checked = true;
        }
        
        // Configurar fecha por defecto
        const fechaInput = document.getElementById('fecha');
        if (fechaInput) {
            const hoy = obtenerFechaHoy();
            fechaInput.value = hoy;
            fechaInput.setAttribute('min', hoy);
        }
    }
}

function initFormAsistencia() {
    const form = document.getElementById('formAsistencia');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const nombre = formData.get('nombre').trim();
        const departamento = formData.get('departamento');
        const fecha = formData.get('fecha');
        const tipo = formData.get('tipo_registro');
        const bloque = formData.get('bloque');

        if (!nombre || !departamento || !fecha || !bloque) {
            mostrarMensajeElemento('mensajeAsistencia', '❌ complete todos los campos', 'error');
            return;
        }

        // Guardar datos en sesión para identificación rápida
        sessionStorage.setItem('empleado_nombre', nombre);
        sessionStorage.setItem('empleado_depto', departamento);
        sessionStorage.setItem('empleado_bloque', bloque);

        try {
            // Verificar duplicado para entradas
            if (tipo === 'entrada') {
                const { data: existente } = await supabase
                    .from('asistencias')
                    .select('*')
                    .eq('nombre', nombre)
                    .eq('fecha', fecha)
                    .eq('tipo_registro', 'entrada');

                if (existente && existente.length > 0) {
                    mostrarMensajeElemento('mensajeAsistencia', '❌ Este empleado ya registró entrada hoy', 'error');
                    return;
                }
            }

            // Obtener ubicación guardada (si existe)
            let lat = sessionStorage.getItem('latitud_registro');
            let lon = sessionStorage.getItem('longitud_registro');

            const registro = {
                nombre,
                fecha,
                departamento,
                bloque,
                tipo_registro: tipo,
                hora_registro: new Date().toISOString(),
                latitud: lat ? parseFloat(lat) : null,
                longitud: lon ? parseFloat(lon) : null
            };

            const { error } = await supabase.from('asistencias').insert([registro]);

            if (error) throw error;

            mostrarMensajeElemento('mensajeAsistencia', `✅ ${tipo === 'entrada' ? 'Entrada' : 'Salida'} registrada con éxito`, 'exito');

            // Actualizar el distintivo de empleado en la UI
            const badge = document.getElementById('badgeEmpleado');
            if (badge) {
                badge.textContent = `Empleado: ${nombre} (${departamento})`;
            }

            setTimeout(() => {
                closeModal('modalAsistente');
            }, 1500);

        } catch (error) {
            console.error('Error:', error);
            mostrarMensajeElemento('mensajeAsistencia', '❌ ' + error.message, 'error');
        }
    });
}