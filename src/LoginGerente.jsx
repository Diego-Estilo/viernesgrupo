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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', position: 'relative', overflow: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* Background Animated/Floating Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 10s infinite ease-in-out alternate' }}></div>
      <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, rgba(236,72,153,0) 70%)', borderRadius: '50%', filter: 'blur(80px)', animation: 'float 12s infinite ease-in-out alternate-reverse' }}></div>
      <div style={{ position: 'absolute', top: '20%', right: '15%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0) 70%)', borderRadius: '50%', filter: 'blur(50px)', animation: 'float 8s infinite ease-in-out' }}></div>

      <div style={{ maxWidth: '440px', width: '90%', padding: '48px', borderRadius: '28px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative', zIndex: 10 }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #3b82f6, #ec4899)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', transform: 'rotate(-5deg)', boxShadow: '0 15px 25px -5px rgba(236, 72, 153, 0.4)' }}>
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
        </div>

        <h1 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: '800', textAlign: 'center', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Portal Gerencial</h1>
        <p style={{ marginBottom: '40px', color: '#94a3b8', fontSize: '1rem', textAlign: 'center' }}>Inicia sesión para continuar</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', display: 'flex' }}>
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <input 
                type="text" 
                required 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                placeholder="Usuario" 
                style={{ width: '100%', padding: '16px 16px 16px 48px', fontSize: '1.05rem', background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.1)'; }}
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
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Contraseña" 
                  style={{ width: '100%', padding: '16px 16px 16px 48px', fontSize: '1.05rem', background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = '#ec4899'; e.target.style.background = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = '0 0 0 4px rgba(236,72,153,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.boxShadow = 'none'; }}
               />
             </div>
          </div>
          
          {mensaje.texto && (
            <div style={{ padding: '14px 16px', borderRadius: '12px', fontWeight: '500', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', background: mensaje.tipo === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: mensaje.tipo === 'error' ? '#fca5a5' : '#6ee7b7', border: `1px solid ${mensaje.tipo === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}` }}>
                {mensaje.tipo === 'error' ? '✖' : '✔'} {mensaje.texto}
            </div>
          )}

          <button type="submit" style={{width: '100%', padding: '16px', fontSize: '1.1rem', borderRadius: '16px', background: 'linear-gradient(90deg, #3b82f6, #ec4899)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '700', transition: 'transform 0.1s, filter 0.2s', outline: 'none', marginTop: '8px', boxShadow: '0 10px 20px -5px rgba(0,0,0,0.3)' }}
               onMouseOver={e => e.target.style.filter = 'brightness(1.1)' }
               onMouseOut={e => e.target.style.filter = 'brightness(1)' }
               onMouseDown={e => e.target.style.transform = 'scale(0.98)'}
               onMouseUp={e => e.target.style.transform = 'scale(1)'}
          >
            Entrar al Sistema
          </button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.95rem', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#ffffff'} onMouseOut={e => e.target.style.color = '#94a3b8'}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Volver al inicio
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
