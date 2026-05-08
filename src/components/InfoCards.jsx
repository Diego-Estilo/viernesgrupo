import React from 'react';

export default function InfoCards({ asistencias, theme, modoOscuro }) {
  const entradas = asistencias.filter(a => a.tipo_registro === 'entrada').length;
  const salidas = asistencias.filter(a => a.tipo_registro === 'salida').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
      <div style={{ backgroundColor: theme.bgCard, borderRadius: '16px', padding: '24px', boxShadow: modoOscuro ? '0 4px 6px -1px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #3b82f6', transition: 'background-color 0.3s ease' }}>
        <div>
          <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', fontWeight: '600', color: theme.textSec, textTransform: 'uppercase', letterSpacing: '1px' }}>Registros Totales</p>
          <h3 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '800', color: theme.textMain }}>{asistencias.length}</h3>
        </div>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: modoOscuro ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
        </div>
      </div>

      <div style={{ backgroundColor: theme.bgCard, borderRadius: '16px', padding: '24px', boxShadow: modoOscuro ? '0 4px 6px -1px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #10b981', transition: 'background-color 0.3s ease' }}>
        <div>
          <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', fontWeight: '600', color: theme.textSec, textTransform: 'uppercase', letterSpacing: '1px' }}>Entradas</p>
          <h3 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '800', color: theme.textMain }}>{entradas}</h3>
        </div>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: modoOscuro ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
        </div>
      </div>

      <div style={{ backgroundColor: theme.bgCard, borderRadius: '16px', padding: '24px', boxShadow: modoOscuro ? '0 4px 6px -1px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #f43f5e', transition: 'background-color 0.3s ease' }}>
        <div>
          <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', fontWeight: '600', color: theme.textSec, textTransform: 'uppercase', letterSpacing: '1px' }}>Salidas</p>
          <h3 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '800', color: theme.textMain }}>{salidas}</h3>
        </div>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: modoOscuro ? 'rgba(244, 63, 94, 0.15)' : '#fff1f2', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        </div>
      </div>
    </div>
  );
}
