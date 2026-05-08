import React from 'react';

export default function GestionAreas({ 
    theme, 
    modoOscuro, 
    nuevaArea, 
    setNuevaArea, 
    agregarArea, 
    departamentos, 
    cargando, 
    editandoId, 
    areaEditada, 
    setAreaEditada, 
    guardarEdicion, 
    setEditandoId, 
    iniciarEdicion, 
    setAreaAEliminar 
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
         
         {/* Formulario Nueva Área */}
         <div style={{ backgroundColor: theme.bgCard, borderRadius: '16px', padding: '24px', boxShadow: modoOscuro ? '0 4px 6px -1px rgba(0,0,0,0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: modoOscuro ? `1px solid ${theme.border}` : 'none', height: 'fit-content' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: theme.textMain }}>Añadir Nueva Área</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: theme.textSec, marginBottom: '5px', display: 'block' }}>Nombre del Departamento</label>
                    <input 
                        type="text" 
                        value={nuevaArea}
                        onChange={(e) => setNuevaArea(e.target.value)}
                        placeholder="Ej: Recursos Humanos"
                        style={{ width: '100%', padding: '12px 15px', color: theme.textMain, borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.inputBg, outline: 'none', boxSizing: 'border-box' }}
                    />
                </div>
                <button 
                    onClick={agregarArea}
                    style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseOver={e=>e.currentTarget.style.background='#2563eb'} 
                    onMouseOut={e=>e.currentTarget.style.background='#3b82f6'}
                >
                    + Crear Área
                </button>
            </div>
         </div>

         {/* Lista de Áreas */}
         <div style={{ backgroundColor: theme.bgCard, borderRadius: '16px', boxShadow: modoOscuro ? '0 4px 6px -1px rgba(0,0,0,0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: modoOscuro ? `1px solid ${theme.border}` : 'none', overflow: 'hidden' }}>
             <div style={{ padding: '20px 24px', borderBottom: `1px solid ${theme.border}`, background: theme.tableHeaderBg }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700', color: theme.textMain }}>Departamentos Actuales</h3>
             </div>
             {departamentos.length === 0 && !cargando ? (
                 <div style={{ padding: '40px', textAlign: 'center', color: theme.textSec }}>
                    No hay departamentos configurados.
                 </div>
             ) : (
                 <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                     {departamentos.map((dept, index) => (
                         <li key={dept.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 24px', borderBottom: `1px solid ${theme.border}`, background: index % 2 === 0 ? 'transparent' : theme.hoverBgAlt, transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background=theme.hoverBg} onMouseOut={e=>e.currentTarget.style.background=index % 2 === 0 ? 'transparent' : theme.hoverBgAlt}>
                             
                             {editandoId === dept.id ? (
                                <div style={{ flex: 1, display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <input 
                                        type="text" 
                                        value={areaEditada} 
                                        onChange={(e) => setAreaEditada(e.target.value)} 
                                        autoFocus
                                        style={{ padding: '8px 12px', flex: 1, borderRadius: '6px', border: `1px solid ${theme.border}`, background: theme.inputBg, color: theme.textMain }}
                                    />
                                    <button onClick={() => guardarEdicion(dept.id)} style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Guardar</button>
                                    <button onClick={() => setEditandoId(null)} style={{ background: theme.iconBg, color: theme.textMain, border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Cancelar</button>
                                </div>
                             ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '32px', height: '32px', background: theme.iconBg, color: theme.textMain, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            🏢
                                        </div>
                                        <span style={{ fontSize: '1.05rem', fontWeight: '500', color: theme.textMain }}>{dept.nombre}</span>
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button onClick={() => iniciarEdicion(dept)} style={{ background: theme.iconBg, color: theme.textMain, border: `1px solid ${theme.border}`, padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }}>✏️ Editar</button>
                                        <button onClick={() => setAreaAEliminar(dept)} style={{ background: modoOscuro ? 'rgba(244, 63, 94, 0.15)' : '#fff1f2', color: '#f43f5e', border: `1px solid ${modoOscuro ? 'rgba(244, 63, 94, 0.3)' : '#fecdd3'}`, padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }}>🗑️ Eliminar</button>
                                    </div>
                                </>
                             )}
                         </li>
                     ))}
                 </ul>
             )}
         </div>
      </div>
  );
}
