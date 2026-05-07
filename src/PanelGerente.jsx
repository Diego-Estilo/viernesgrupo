import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function PanelGerente() {
  const navigate = useNavigate();
  const [asistencias, setAsistencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState('todos');

  useEffect(() => {
    if (!sessionStorage.getItem('gerente_logueado')) {
      navigate('/gerente-login');
      return;
    }
    cargarAsistencias();
  }, []);

  const cargarAsistencias = async () => {
    setCargando(true);
    try {
      const { data, error } = await supabase
        .from('asistencias')
        .select('*')
        .order('id', { ascending: false });

      if (!error && data) {
        setAsistencias(data);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
    setCargando(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('gerente_logueado');
    sessionStorage.removeItem('gerente_nombre');
    navigate('/');
  };

  const asistenciasFiltradas = asistencias.filter(reg => {
    if (filtroTipo === 'todos') return true;
    return reg.tipo_registro === filtroTipo;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="title" style={{ fontSize: '2.2rem' }}>📊 Panel Ejecutivo</h1>
          <p className="subtitle" style={{ margin: 0 }}>Bienvenido de nuevo, <strong>{sessionStorage.getItem('gerente_nombre') || 'Gerente'}</strong></p>
        </div>
        <button className="btn btn-danger" onClick={handleLogout} style={{ width: 'auto', marginBottom: 0, padding: '12px 24px', borderRadius: '12px' }}>
          🚪 Cerrar Sesión
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-info">
            <div className="stat-value" style={{ color: '#4f46e5' }}>{asistencias.length}</div>
            <div className="stat-title">Registros Totales</div>
          </div>
          <div className="stat-icon">📈</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-info">
            <div className="stat-value" style={{ color: '#10b981' }}>{asistencias.filter(a => a.tipo_registro === 'entrada').length}</div>
            <div className="stat-title">Entradas Registradas</div>
          </div>
          <div className="stat-icon">🟢</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-info">
            <div className="stat-value" style={{ color: '#ef4444' }}>{asistencias.filter(a => a.tipo_registro === 'salida').length}</div>
            <div className="stat-title">Salidas Registradas</div>
          </div>
          <div className="stat-icon">🔴</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: 'white', padding: '20px 30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.03)' }}>
        <h2 className="title" style={{ fontSize: '1.4rem', margin: 0 }}>📋 Últimos Movimientos</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <select 
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
            style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontWeight: 'bold', color: '#475569', cursor: 'pointer' }}
          >
            <option value="todos">🔍 Todos los registros</option>
            <option value="entrada">🟢 Solo Entradas</option>
            <option value="salida">🔴 Solo Salidas</option>
          </select>
          <button onClick={cargarAsistencias} className="btn btn-primary" style={{ width: 'auto', marginBottom: 0, borderRadius: '8px' }}>
            🔄 Actualizar Datos
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Departamento</th>
              <th>Fecha y Hora</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>Cargando de Supabase...</td></tr>
            ) : asistenciasFiltradas.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>No hay registros que coincidan con el filtro seleccionado 📭</td></tr>
            ) : (
                asistenciasFiltradas.map((reg) => (
                    <tr key={reg.id}>
                        <td>
                          <strong>{reg.nombre}</strong>
                        </td>
                        <td>{reg.departamento || '-'}</td>
                        <td>
                          {reg.fecha} <span style={{ color: '#6b7280', marginLeft: '5px' }}>
                            {new Date(reg.hora_registro).toLocaleTimeString('es-ES')}
                          </span>
                        </td>
                        <td>
                            <span className={`badge ${reg.tipo_registro === 'entrada' ? 'badge-green' : 'badge-red'}`}>
                                {reg.tipo_registro}
                            </span>
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
