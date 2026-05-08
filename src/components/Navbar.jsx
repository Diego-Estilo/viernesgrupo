import React from 'react';

export default function Navbar({ theme, modoOscuro, setModoOscuro, handleLogout }) {
  const gerenteNombre = sessionStorage.getItem('gerente_nombre') || 'Gerente Principal';
  const initial = gerenteNombre.charAt(0).toUpperCase();

  return (
    <nav style={{ backgroundColor: theme.bgNav, borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, zIndex: 10, padding: '0 2rem', transition: 'background-color 0.3s ease, border-color 0.3s ease' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: '#3b82f6', color: 'white', padding: '8px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: theme.textMain, letterSpacing: '-0.5px' }}>Panel Gerente</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
              onClick={() => setModoOscuro(!modoOscuro)} 
              style={{ background: 'transparent', border: 'none', color: theme.textSec, cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.2s' }}
              title={modoOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
              {modoOscuro ? (
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
          </button>

          <div style={{ height: '30px', width: '1px', backgroundColor: theme.border, margin: '0 5px' }}></div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', color: theme.textSec, fontWeight: '500' }}>Administrador</span>
            <span style={{ fontSize: '0.95rem', color: theme.textMain, fontWeight: '600' }}>{gerenteNombre}</span>
          </div>
          
          <div style={{ width: '40px', height: '40px', background: theme.iconBg, color: theme.iconText, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
             {initial}
          </div>
          
          <div style={{ height: '30px', width: '1px', backgroundColor: theme.border, margin: '0 5px' }}></div>
          
          <button onClick={handleLogout} style={{ border: 'none', background: 'transparent', color: '#ef4444', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', borderRadius: '6px', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background=modoOscuro ? 'rgba(239, 68, 68, 0.1)' : '#fee2e2'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
             Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
