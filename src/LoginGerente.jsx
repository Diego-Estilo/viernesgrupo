import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function LoginGerente() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje({ texto: 'Iniciando...', tipo: '' });
    
    try {
      const { data: gerente, error } = await supabase
        .from('gerentes')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !gerente) {
        setMensaje({ texto: '❌ Credenciales incorrectas', tipo: 'error' });
        return;
      }

      sessionStorage.setItem('gerente_logueado', 'true');
      sessionStorage.setItem('gerente_nombre', gerente.nombre);
      
      setMensaje({ texto: '✅ Acceso concedido', tipo: 'exito' });
      setTimeout(() => navigate('/gerente'), 1000);

    } catch (err) {
      setMensaje({ texto: '❌ Error de conexión', tipo: 'error' });
    }
  };

  return (
    <div className="page-container">
      <div className="modern-card">
        <h1 className="title">Acceso Gerencial</h1>
        <p className="subtitle">Gestión y control de asistencia</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Usuario</label>
            <input 
              type="text" 
              className="modern-input" 
              required 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Ej: admin" 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <input 
              type="password" 
              className="modern-input" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••" 
            />
          </div>
          
          {mensaje.texto && (
            <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '8px', background: mensaje.tipo === 'error' ? '#fee2e2' : '#d1fae5', color: mensaje.tipo === 'error' ? '#991b1b' : '#065f46' }}>
                {mensaje.texto}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Ingresar</button>
        </form>

        <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
          <Link to="/" className="btn btn-outline">← Volver al Inicio</Link>
        </div>
      </div>
    </div>
  );
}
