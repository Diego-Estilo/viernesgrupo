// ===========================================
// PANEL GERENCIAL - SUPABASE
// ===========================================

// Variable global para datos exportación
let chartInstancia = null;
let datosActuales = [];

// ✅ LÓGICA DE TARDANZAS (Igual a tu PHP)
function esTardanzaEntrada(horaISO, bloque) {
    if (!horaISO) return false;
    const d = new Date(horaISO);
    const horaStr = d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0');
    
    switch (bloque) {
        case 'Practicante': return horaStr > '10:00';
        case 'Oficina':     return horaStr > '07:00';
        case 'Industrial':  return horaStr > '06:00';
        default:            return horaStr > '09:00';
    }
}

// Agrupar registros por Nombre y Fecha
function agruparAsistencias(datos) {
    const agrupados = {};
    
    datos.forEach(reg => {
        const key = `${reg.nombre}-${reg.fecha}`;
        if (!agrupados[key]) {
            agrupados[key] = {
                id: reg.id,
                nombre: reg.nombre,
                departamento: reg.departamento,
                bloque: reg.bloque,
                fecha: reg.fecha,
                entrada: null,
                salida: null,
                latitud: reg.latitud,
                longitud: reg.longitud
            };
        }
        if (reg.tipo_registro === 'entrada') agrupados[key].entrada = reg.hora_registro;
        if (reg.tipo_registro === 'salida') agrupados[key].salida = reg.hora_registro;
    });
    
    return Object.values(agrupados);
}

// ✅ UTILIDADES DE FORMATO DE NOMBRE
function obtenerIniciales(nombre) {
    if (!nombre) return '?';
    const partes = nombre.trim().split(/\s+/);
    if (partes.length >= 2) {
        return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
    }
    return partes[0].charAt(0).toUpperCase();
}

function capitalizarNombre(nombre) {
    if (!nombre) return '';
    return nombre.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Verificar autenticación
document.addEventListener('DOMContentLoaded', function() {
    // Verificar Supabase configurado
    if (typeof supabase === 'undefined') {
        document.getElementById('tablaContainer').innerHTML =
            '<div class="error-message">❌ Supabase no configurado. Edita supabase.js con tus credenciales.</div>';
        return;
    }

    const logueado = sessionStorage.getItem('gerente_logueado');

    if (!logueado) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('nombreGerenteLogueado').textContent = sessionStorage.getItem('gerente_nombre') || 'Gerente';
    document.getElementById('fechaHoyHeader').textContent = `• ${new Date().toLocaleDateString()}`;
    
    cargarTema();
    cargarDatos();
});

// ===========================================
// ACTUALIZAR ESTADÍSTICAS
// ===========================================

function actualizarEstadisticas(datos) {
    const agrupados = agruparAsistencias(datos);
    const presentes = agrupados.length;
    const tardanzas = agrupados.filter(a => esTardanzaEntrada(a.entrada, a.bloque)).length;
    
    document.getElementById('statPresentes').textContent = presentes;
    document.getElementById('statRetardos').textContent = tardanzas.toString().padStart(2, '0');
    document.getElementById('statAusentes').textContent = "00"; // Requiere lista total de empleados
    
    cargarConteoJustificaciones();
}

// ===========================================
// RENDERIZAR TABLA
// ===========================================

function renderizarTabla(datos) {
    const tbody = document.getElementById('tbodyAsistencias');
    const agrupados = agruparAsistencias(datos);

    tbody.innerHTML = agrupados.map(reg => {
        const tardanza = esTardanzaEntrada(reg.entrada, reg.bloque);
        return `
            <tr>
                <td>#${reg.id.substring(0, 4)}</td>
                <td>
                    <div class="employee-info">
                        <div class="employee-avatar">${obtenerIniciales(reg.nombre)}</div>
                        <div class="employee-name">${capitalizarNombre(reg.nombre)}</div>
                    </div>
                </td>
                <td>${reg.departamento}</td>
                <td><span class="bloque-badge">${reg.bloque}</span></td>
                <td>${formatearFecha(reg.fecha)}</td>
                <td class="${tardanza ? 'hora-roja' : 'hora-normal'}">${formatearHora(reg.entrada)}</td>
                <td class="hora-normal">${formatearHora(reg.salida)}</td>
                <td>
                    ${reg.latitud ? `<a href="https://maps.google.com/?q=${reg.latitud},${reg.longitud}" target="_blank">📍 Ver mapa</a>` : 'No registrada'}
                </td>
                <td>
                    <span class="status-badge ${tardanza ? 'status-tardanza' : 'status-puntual'}">
                        ${tardanza ? '⏰ Tardanza' : '✅ Puntual'}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
    
    document.getElementById('paginationInfo').textContent = `Mostrando ${agrupados.length} empleados registrados hoy.`;
    cargarJustificaciones();
}

// ===========================================
// VER UBICACIÓN EN MAPA
// ===========================================

function verUbicacion(lat, lng) {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
}

// ===========================================
// LÓGICA DE CARGA DE DATOS
// ===========================================
async function cargarDatos() {
    const fechaFiltro = document.getElementById('filtroFecha').value;
    const bloqueFiltro = document.getElementById('filtroBloque').value;
    const nombreFiltro = document.getElementById('filtroNombre')?.value.toLowerCase() || '';

    try {
        let query = supabase
            .from('asistencias')
            .select('*')
            .order('fecha', { ascending: false })
            .order('hora_registro', { ascending: false });

        if (fechaFiltro) query = query.eq('fecha', fechaFiltro); else query = query.eq('fecha', obtenerFechaHoy());
        if (bloqueFiltro !== 'todos') query = query.eq('bloque', bloqueFiltro);

        const { data: asistencias, error } = await query;

        if (error) {
            console.error('Error:', error);
            document.getElementById('tablaContainer').innerHTML =
                `<div class="error-message">❌ Error al cargar datos: ${error.message}</div>`;
            return;
        }

        // Filtrar por nombre localmente
        let datosFiltrados = asistencias;
        if (nombreFiltro) {
            datosFiltrados = asistencias.filter(a =>
                a.nombre.toLowerCase().includes(nombreFiltro)
            );
        }

        datosActuales = datosFiltrados;
        actualizarEstadisticas(datosFiltrados);
        renderizarTabla(datosFiltrados);

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('tablaContainer').innerHTML =
            `<div class="error-message">❌ Error de conexión con Supabase</div>`;
    }
}

function exportarExcel() {
    if (!datosActuales || datosActuales.length === 0) {
        alert('No hay datos para exportar');
        return;
    }

    // Construir CSV
    let csv = 'Fecha,Nombre,Departamento,Bloque,Tipo,Hora,Latitud,Longitud\n';

    datosActuales.forEach(registro => {
        const fecha = registro.fecha; // Ya está en formato YYYY-MM-DD
        const nombre = registro.nombre;
        const departamento = registro.departamento;
        const bloque = registro.bloque;
        const tipo = registro.tipo_registro === 'entrada' ? 'Entrada' : 'Salida';
        const hora = formatearHora(registro.hora_registro || registro.created_at);
        const latitud = registro.latitud || '';
        const longitud = registro.longitud || '';

        // Escapar comillas dobles
        const escapar = (texto) => `"${texto.replace(/"/g, '""')}"`;

        csv += `${escapar(fecha)},${escapar(nombre)},${escapar(departamento)},${escapar(bloque)},${escapar(tipo)},${escapar(hora)},${latitud},${longitud}\n`;
    });

    // Descargar archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    const fechaActual = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `asistencias_${fechaActual}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===========================================
// LÓGICA DE JUSTIFICACIONES Y GRÁFICOS (CONSOLIDADA)
// ===========================================
async function cargarConteoJustificaciones() {
    const { count } = await supabase.from('justificaciones').select('*', { count: 'exact', head: true }).eq('estado', 'pendiente');
    document.getElementById('statJustificaciones').textContent = count || 0;
}

async function cargarJustificaciones() {
    const { data } = await supabase.from('justificaciones').select('*').order('created_at', { ascending: false });
    const tbody = document.getElementById('tbodyJustificaciones');
    if(!tbody) return;
    
    tbody.innerHTML = data.map(j => `
        <tr>
            <td><strong>${j.nombre}</strong></td>
            <td>${formatearFecha(j.fecha)}</td>
            <td>${j.motivo}</td>
            <td>${j.descripcion || '---'}</td>
            <td><span class="status-badge status-${j.estado}">${j.estado.toUpperCase()}</span></td>
            <td>
                ${j.estado === 'pendiente' ? `
                    <button onclick="responderJustifica('${j.id}', 'aprobado')" style="color:green; border:none; background:none; cursor:pointer;">✓</button>
                    <button onclick="responderJustifica('${j.id}', 'rechazado')" style="color:red; border:none; background:none; cursor:pointer;">✗</button>
                ` : '---'}
            </td>
        </tr>
    `).join('');
}

async function responderJustifica(id, estado) {
    await supabase.from('justificaciones').update({ estado }).eq('id', id);
    cargarJustificaciones();
}

function renderizarGraficos() {
    const ctx = document.getElementById('chartAsistencias').getContext('2d');
    if (chartInstancia) chartInstancia.destroy();
    
    const conteoDeptos = {};
    datosActuales.forEach(d => { conteoDeptos[d.departamento] = (conteoDeptos[d.departamento] || 0) + 1; });

    chartInstancia = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(conteoDeptos),
            datasets: [{
                label: 'Asistencias por Departamento',
                data: Object.values(conteoDeptos),
                backgroundColor: '#7c3aed'
            }]
        }
    });
}
