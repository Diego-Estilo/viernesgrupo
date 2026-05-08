import React from 'react';

export default function ModalConfirmacion({ isOpen, title, message, onConfirm, onCancel, theme, modoOscuro }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(3px)' }}>
      <div style={{ backgroundColor: theme.bgCard, padding: '32px', borderRadius: '16px', maxWidth: '420px', width: '90%', boxShadow: modoOscuro ? '0 20px 25px -5px rgba(0,0,0,0.8)' : '0 20px 25px -5px rgba(0,0,0,0.1)', border: modoOscuro ? `1px solid ${theme.border}` : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: modoOscuro ? 'rgba(244, 63, 94, 0.15)' : '#fee2e2', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.3rem', color: theme.textMain, fontWeight: '700' }}>{title}</h3>
          </div>
        </div>
        <p style={{ color: theme.textSec, fontSize: '1rem', lineHeight: '1.5', margin: '0 0 24px 0' }} dangerouslySetInnerHTML={{ __html: message }}></p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onCancel} style={{ padding: '10px 18px', background: theme.iconBg, color: theme.textMain, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'background 0.2s', fontSize: '0.95rem' }}>Cancelar</button>
          <button onClick={onConfirm} style={{ padding: '10px 18px', background: '#e11d48', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'background 0.2s', fontSize: '0.95rem' }}>Sí, Eliminar</button>
        </div>
      </div>
    </div>
  );
}
