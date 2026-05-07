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
    <div className="page-container" style={{ background: 'radial-gradient(circle at top right, #312e81, #1e1b4b, #000000)' }}>
      <div className="modern-card" style={{ maxWidth: '440px', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: 'none', borderTop: '6px solid #6366f1', background: 'rgba(255, 255, 255, 0.98)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.2)' }}>
            💼
          </div>
        </div>

        <h1 className="title" style={{ fontSize: '2.2rem', color: '#1e1b4b', fontWeight: '800', letterSpacing: '-0.5px' }}>Portal Ejecutivo</h1>
        <p className="subtitle" style={{ marginBottom: '35px', color: '#64748b', fontSize: '0.95rem' }}>Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label" style={{ color: '#475569', fontSize: '0.8rem', fontWeight: '700' }}>NOMBRE DE USUARIO</label>
            <input 
              type="text" 
              className="modern-input" 
              required 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Ej: admin" 
              style={{ padding: '16px', fontSize: '1.05rem', background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px' }}
            />
          </div>
          <div className="input-group" style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="input-label" style={{ color: '#475569', fontSize: '0.8rem', fontWeight: '700' }}>CONTRASEÑA</label>
            </div>
            <input 
              type="password" 
              className="modern-input" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••" 
              style={{ padding: '16px', fontSize: '1.05rem', background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px' }}
            />
          </div>
          
          {mensaje.texto && (
            <div style={{ padding: '14px', marginTop: '20px', marginBottom: '10px', borderRadius: '12px', fontWeight: '600', fontSize: '0.95rem', background: mensaje.tipo === 'error' ? '#fef2f2' : '#ecfdf5', color: mensaje.tipo === 'error' ? '#991b1b' : '#065f46', border: `1px solid ${mensaje.tipo === 'error' ? '#fca5a5' : '#6ee7b7'}` }}>
                {mensaje.texto}
            </div>
          )}

          <button type="submit" className="btn" style={{ marginTop: '25px', padding: '16px', fontSize: '1.1rem', borderRadius: '12px', background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', color: 'white', border: 'none', boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)', fontWeight: 'bold' }}>
            Acceder al Sistema
          </button>
        </form>

        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
          <Link to="/" className="btn btn-outline" style={{ padding: '14px', borderRadius: '12px', border: 'none', background: 'transparent', color: '#94a3b8', fontWeight: '600', transition: 'all 0.2s' }} onMouseOver={e => e.target.style.color = '#4f46e5'} onMouseOut={e => e.target.style.color = '#94a3b8'}>
            ← Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
