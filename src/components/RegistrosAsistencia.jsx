import React from 'react';

export default function RegistrosAsistencia({ 
    theme, 
    modoOscuro, 
    busqueda, 
    setBusqueda, 
    filtroTipo, 
    setFiltroTipo, 
    cargarDatos, 
    cargando, 
    asistenciasFiltradas, 
    formatearFecha, 
    formatearHora 
}) {
  return (
    <div style={{ backgroundColor: theme.bgCard, borderRadius: '16px', boxShadow: modoOscuro ? '0 4px 6px -1px rgba(0,0,0,0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', overflow: 'hidden', border: modoOscuro ? `1px solid ${theme.border}` : 'none' }}>
      
      {/* Table Toolbar */}
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.tableHeaderBg }}>
        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700', color: theme.textMain }}>Directorio de Registros</h3>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          
          <div style={{ position: 'relative' }}>
             <svg width="18" height="18" fill="none" stroke={theme.textSec} strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: '12px', top: '10px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
             <input 
               type="text" 
               placeholder="Buscar empleado o dpto..." 
               value={busqueda}
               onChange={(e) => setBusqueda(e.target.value)}
               style={{ padding: '9px 12px 9px 38px', color: theme.textMain, borderRadius: '8px', border: `1px solid ${theme.border}`, outline: 'none', fontSize: '0.9rem', width: '250px', transition: 'border 0.2s, box-shadow 0.2s', background: theme.inputBg }}
               onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)'}
               onBlur={e => e.target.style.boxShadow = 'none'}
             />
          </div>

          <select 
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
            style={{ padding: '9px 15px', borderRadius: '8px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}
          >
            <option value="todos">Todos los tipos</option>
            <option value="entrada">Solo Entradas</option>
            <option value="salida">Solo Salidas</option>
          </select>

          <button onClick={cargarDatos} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 15px', background: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '8px', cursor: 'pointer', color: theme.textMain, fontWeight: '500', fontSize: '0.9rem', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background=theme.hoverBg} onMouseOut={e=>e.currentTarget.style.background=theme.inputBg}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Actualizar
          </button>

        </div>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: theme.tableHeaderBg, borderBottom: `1px solid ${theme.border}` }}>
            <tr>
              <th style={{ padding: '16px 24px', color: theme.textSec, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Colaborador</th>
              <th style={{ padding: '16px 24px', color: theme.textSec, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Departamento</th>
              <th style={{ padding: '16px 24px', color: theme.textSec, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fecha y Hora</th>
              <th style={{ padding: '16px 24px', color: theme.textSec, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: theme.textSec }}>
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <svg className="animate-spin" width="24" height="24" style={{ animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke={theme.border} strokeWidth="4"></circle><path fill="#3b82f6" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Cargando base de datos...
                   </div>
                </td>
              </tr>
            ) : asistenciasFiltradas.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '60px', color: theme.textSec }}>
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📁</div>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500', color: theme.textMain }}>No se encontraron registros</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>Intenta ajustar tus filtros de búsqueda.</p>
                </td>
              </tr>
            ) : (
              asistenciasFiltradas.map((reg, index) => (
                <tr key={reg.id} style={{ borderBottom: `1px solid ${theme.border}`, background: index % 2 === 0 ? 'transparent' : theme.hoverBgAlt, transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background=theme.hoverBg} onMouseOut={e=>e.currentTarget.style.background=index % 2 === 0 ? 'transparent' : theme.hoverBgAlt}>
                  
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: theme.iconBg, color: theme.iconText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
                        {reg.nombre ? reg.nombre.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: '600', color: theme.textMain, fontSize: '0.95rem' }}>{reg.nombre}</p>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: theme.textSec }}>ID: {reg.id}</p>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '16px 24px', color: theme.textMain, fontSize: '0.9rem', fontWeight: '500' }}>
                    <span style={{ display: 'inline-block', padding: '4px 10px', background: theme.badgeGenBg, color: theme.badgeGenText, borderRadius: '6px', border: `1px solid ${theme.border}` }}>
                      {reg.departamento || 'Sin asignar'}
                    </span>
                  </td>

                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <span style={{ color: theme.textMain, fontWeight: '500', fontSize: '0.9rem' }}>{formatearFecha(reg.fecha)}</span>
                       <span style={{ color: theme.textSec, fontSize: '0.8rem', marginTop: '2px' }}>{formatearHora(reg.hora_registro)}</span>
                    </div>
                  </td>

                  <td style={{ padding: '16px 24px' }}>
                    {reg.tipo_registro === 'entrada' ? (
                       <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: modoOscuro ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5', color: modoOscuro ? '#34d399' : '#065f46', border: modoOscuro ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid #a7f3d0', padding: '4px 10px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600' }}>
                         <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                         Entrada
                       </span>
                    ) : (
                       <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: modoOscuro ? 'rgba(244, 63, 94, 0.15)' : '#fff1f2', color: modoOscuro ? '#fb7185' : '#9f1239', border: modoOscuro ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid #fecdd3', padding: '4px 10px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600' }}>
                         <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f43f5e' }}></span>
                         Salida
                       </span>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
