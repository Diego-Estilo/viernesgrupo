import React, { useState } from 'react';
import { supabase } from './supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function RegistroGerente() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensaje({ texto: 'Procesando...', tipo: '' });
    
    try {
      const { error } = await supabase
        .from('gerentes')
        .insert([
          { username, password, nombre: username }
        ]);

      if (error) {
        setMensaje({ texto: `Error: ${error.message}`, tipo: 'error' });
      } else {
        setMensaje({ texto: '✅ ¡Cuenta creada con éxito!', tipo: 'exito' });
        setTimeout(() => navigate('/gerente-login'), 2000);
      }
    } catch (err) {
      setMensaje({ texto: '❌ Error de conexión', tipo: 'error' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', position: 'relative', overflow: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* Background Animated Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0) 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 10s infinite ease-in-out alternate' }}></div>
      <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 70%)', borderRadius: '50%', filter: 'blur(80px)', animation: 'float 12s infinite ease-in-out alternate-reverse' }}></div>

      <div style={{ maxWidth: '440px', width: '90%', padding: '48px', borderRadius: '28px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative', zIndex: 10 }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #10b981, #3b82f6)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', transform: 'rotate(-5deg)', boxShadow: '0 15px 25px -5px rgba(16, 185, 129, 0.4)' }}>
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
          </div>
        </div>

        <h1 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: '800', textAlign: 'center', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Nueva Cuenta</h1>
        <p style={{ marginBottom: '40px', color: '#94a3b8', fontSize: '1rem', textAlign: 'center' }}>Crea tu acceso de administrador</p>
        
        <form onSubmit={handleRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', display: 'flex' }}>
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <input 
                type="text" 
                required 
                placeholder="Nombre de Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 48px', fontSize: '1.05rem', background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = '#10b981'; e.target.style.background = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = '0 0 0 4px rgba(16,185,129,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>
          
          <div>
            <div style={{ position: 'relative' }}>
               <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', display: 'flex' }}>
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
               </div>
              <input 
                type="password" 
                required
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 48px', fontSize: '1.05rem', background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {mensaje.texto && (
            <div style={{ padding: '14px 16px', borderRadius: '12px', fontWeight: '500', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', background: mensaje.tipo === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: mensaje.tipo === 'error' ? '#fca5a5' : '#6ee7b7', border: `1px solid ${mensaje.tipo === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}` }}>
                {mensaje.tipo === 'error' ? '✖' : '✔'} {mensaje.texto}
            </div>
          )}
          
          <button type="submit" style={{width: '100%', padding: '16px', fontSize: '1.1rem', borderRadius: '16px', background: 'linear-gradient(90deg, #10b981, #3b82f6)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '700', transition: 'transform 0.1s, filter 0.2s', outline: 'none', marginTop: '8px', boxShadow: '0 10px 20px -5px rgba(0,0,0,0.3)' }}
               onMouseOver={e => e.target.style.filter = 'brightness(1.1)' }
               onMouseOut={e => e.target.style.filter = 'brightness(1)' }
               onMouseDown={e => e.target.style.transform = 'scale(0.98)'}
               onMouseUp={e => e.target.style.transform = 'scale(1)'}
          >
            Registrar Gerente
          </button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Link to="/gerente-login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#818cf8'} onMouseOut={e => e.target.style.color = '#6366f1'}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </div>
  );
}