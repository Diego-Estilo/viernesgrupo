/**
 * login_gerente.js - Manejo de acceso y registro de gerentes
 */

document.addEventListener('DOMContentLoaded', () => {
    cargarTema();
});

function toggleAuth(showRegister) {
    document.getElementById('loginSection').style.display = showRegister ? 'none' : 'block';
    document.getElementById('registerSection').style.display = showRegister ? 'block' : 'none';
}

// Lógica de Inicio de Sesión
document.getElementById('formLogin').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    try {
        const { data: gerente, error } = await window.supabase
            .from('gerentes')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        if (error || !gerente) {
            mostrarMensajeElemento('mensajeLogin', '❌ Credenciales incorrectas', 'error');
            return;
        }

        sessionStorage.setItem('gerente_logueado', 'true');
        sessionStorage.setItem('gerente_nombre', gerente.nombre);
        
        mostrarMensajeElemento('mensajeLogin', '✅ Acceso concedido', 'exito');
        setTimeout(() => window.location.href = '../proceso3-gerente/panel_gerente.html', 1000);

    } catch (err) {
        mostrarMensajeElemento('mensajeLogin', '❌ Error de conexión', 'error');
    }
});

// Lógica de Registro (Crear Cuenta)
document.getElementById('formRegister').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nombre = document.getElementById('regNombre').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;

    if (password.length < 4) {
        mostrarMensajeElemento('mensajeRegister', '❌ Contraseña muy corta', 'error');
        return;
    }

    try {
        const { error } = await window.supabase
            .from('gerentes')
            .insert([{ 
                nombre: nombre, 
                username: username, 
                password: password 
            }]);

        if (error) {
            if (error.code === '23505') {
                mostrarMensajeElemento('mensajeRegister', '❌ El usuario ya existe', 'error');
            } else {
                throw error;
            }
            return;
        }

        mostrarMensajeElemento('mensajeRegister', '✅ Cuenta creada. Inicia sesión.', 'exito');
        setTimeout(() => toggleAuth(false), 2000);

    } catch (err) {
        mostrarMensajeElemento('mensajeRegister', '❌ Error al crear cuenta', 'error');
    }
});