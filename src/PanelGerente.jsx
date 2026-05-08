import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';
import Navbar from './components/Navbar';
import InfoCards from './components/InfoCards';
import RegistrosAsistencia from './components/RegistrosAsistencia';
import GestionAreas from './components/GestionAreas';
import ModalConfirmacion from './components/ModalConfirmacion';

export default function PanelGerente({ modoOscuro, setModoOscuro }) {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState('registros'); // 'registros' | 'areas'
  const [asistencias, setAsistencias] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  // Estados para CRUD de áreas
  const [nuevaArea, setNuevaArea] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [areaEditada, setAreaEditada] = useState('');
  const [areaAEliminar, setAreaAEliminar] = useState(null);

  useEffect(() => {
    if (!sessionStorage.getItem('gerente_logueado')) {
      navigate('/gerente-login');
      return;
    }
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      // Cargar asistencias
      const { data: dataAsist } = await supabase.from('asistencias').select('*').order('id', { ascending: false });
      if (dataAsist) setAsistencias(dataAsist);

      // Cargar departamentos (requiere crear la tabla 'departamentos' en supabase)
      const { data: dataDept } = await supabase.from('departamentos').select('*').order('nombre', { ascending: true });
      if (dataDept) setDepartamentos(dataDept);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
    setCargando(false);
  };

  // ----- FUNCIONES CRUD PARA ÁREAS / DEPARTAMENTOS -----
  const agregarArea = async () => {
    if (!nuevaArea.trim()) return;
    const { data, error } = await supabase.from('departamentos').insert([{ nombre: nuevaArea.trim() }]).select();
    if (!error && data) {
      setDepartamentos([...departamentos, data[0]]);
      setNuevaArea('');
    } else {
      console.error('Error detallado al agregar área:', error);
      alert(`Error guardando en Supabase: ${error?.message}. Revisa la consola para más detalles.`);
    }
  };

  const iniciarEdicion = (dept) => {
    setEditandoId(dept.id);
    setAreaEditada(dept.nombre);
  };

  const guardarEdicion = async (id) => {
    if (!areaEditada.trim()) return;
    const { error } = await supabase.from('departamentos').update({ nombre: areaEditada.trim() }).eq('id', id);
    if (!error) {
      setDepartamentos(departamentos.map(d => d.id === id ? { ...d, nombre: areaEditada.trim() } : d));
      setEditandoId(null);
    }
  };

  const confirmarEliminarArea = async () => {
    if (!areaAEliminar) return;
    const { error } = await supabase.from('departamentos').delete().eq('id', areaAEliminar.id);
    if (!error) {
      setDepartamentos(departamentos.filter(d => d.id !== areaAEliminar.id));
      setAreaAEliminar(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('gerente_logueado');
    sessionStorage.removeItem('gerente_nombre');
    navigate('/');
  };

  const asistenciasFiltradas = asistencias.filter(reg => {
    const cumpleTipo = filtroTipo === 'todos' || reg.tipo_registro === filtroTipo;
    const nombreValido = reg.nombre ? reg.nombre.toLowerCase() : '';
    const deptoValido = reg.departamento ? reg.departamento.toLowerCase() : '';
    const termino = busqueda.toLowerCase();
    const cumpleBusqueda = nombreValido.includes(termino) || deptoValido.includes(termino);
    return cumpleTipo && cumpleBusqueda;
  });

  const formatearFecha = (fechaDb) => {
    const opciones = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    try {
      const d = new Date(fechaDb);
      if(isNaN(d)) return fechaDb;
      return d.toLocaleDateString('es-ES', opciones).replace(',', '');
    } catch { return fechaDb; }
  };

  const formatearHora = (horaOriginal) => {
    if (!horaOriginal) return '';
    try {
      if(typeof horaOriginal === 'string' && !horaOriginal.includes('T')) {
          const d = new Date(); const [h,m,s] = horaOriginal.split(':'); d.setHours(h,m,s);
          return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      }
      return new Date(horaOriginal).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } catch { return horaOriginal; }
  };

  // Variables de Theme Centralizado
  const theme = {
    bgApp: modoOscuro ? '#0f172a' : '#f1f5f9',
    bgNav: modoOscuro ? '#1e293b' : '#ffffff',
    bgCard: modoOscuro ? '#1e293b' : '#ffffff',
    textMain: modoOscuro ? '#f8fafc' : '#0f172a',
    textSec: modoOscuro ? '#94a3b8' : '#64748b',
    border: modoOscuro ? '#334155' : '#e2e8f0',
    hoverBg: modoOscuro ? '#334155' : '#f1f5f9',
    hoverBgAlt: modoOscuro ? '#1e293b' : '#fafafa',
    inputBg: modoOscuro ? '#0f172a' : '#ffffff',
    tableHeaderBg: modoOscuro ? '#0f172a' : '#f8fafc',
    iconBg: modoOscuro ? '#334155' : '#e2e8f0',
    iconText: modoOscuro ? '#cbd5e1' : '#475569',
    badgeGenBg: modoOscuro ? '#334155' : '#f1f5f9',
    badgeGenText: modoOscuro ? '#f8fafc' : '#475569',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bgApp, fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif', transition: 'background-color 0.3s ease' }}>
      
      <Navbar theme={theme} modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} handleLogout={handleLogout} />

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: theme.textMain, margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
              Administración General
            </h2>
            <p style={{ color: theme.textSec, margin: 0, fontSize: '1rem' }}>Gestión de personal y estructura organizativa de la empresa.</p>
          </div>
        </div>

        {/* Custom Tabs */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '2.5rem', borderBottom: `2px solid ${theme.border}` }}>
            <button 
                onClick={() => setTabActiva('registros')} 
                style={{ background: 'transparent', border: 'none', padding: '12px 15px', fontSize: '1.05rem', fontWeight: '600', color: tabActiva === 'registros' ? '#3b82f6' : theme.textSec, borderBottom: tabActiva === 'registros' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '-2px' }}
            >
                📋 Registros de Asistencia
            </button>
            <button 
                onClick={() => setTabActiva('areas')} 
                style={{ background: 'transparent', border: 'none', padding: '12px 15px', fontSize: '1.05rem', fontWeight: '600', color: tabActiva === 'areas' ? '#3b82f6' : theme.textSec, borderBottom: tabActiva === 'areas' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '-2px' }}
            >
                🏢 Gestión de Áreas (Departamentos)
            </button>
        </div>

        {tabActiva === 'registros' && (
          <>
            <InfoCards asistencias={asistencias} theme={theme} modoOscuro={modoOscuro} />
            <RegistrosAsistencia 
              theme={theme} 
              modoOscuro={modoOscuro} 
              busqueda={busqueda} 
              setBusqueda={setBusqueda} 
              filtroTipo={filtroTipo} 
              setFiltroTipo={setFiltroTipo} 
              cargarDatos={cargarDatos} 
              cargando={cargando} 
              asistenciasFiltradas={asistenciasFiltradas} 
              formatearFecha={formatearFecha} 
              formatearHora={formatearHora} 
            />
          </>
        )}

        {/* --- PESTAÑA: DEPARTAMENTOS / ÁREAS --- */}
        {tabActiva === 'areas' && (
          <GestionAreas 
            theme={theme} 
            modoOscuro={modoOscuro} 
            nuevaArea={nuevaArea} 
            setNuevaArea={setNuevaArea} 
            agregarArea={agregarArea} 
            departamentos={departamentos} 
            cargando={cargando} 
            editandoId={editandoId} 
            areaEditada={areaEditada} 
            setAreaEditada={setAreaEditada} 
            guardarEdicion={guardarEdicion} 
            setEditandoId={setEditandoId} 
            iniciarEdicion={iniciarEdicion} 
            setAreaAEliminar={setAreaAEliminar} 
          />
        )}

        {/* --- MODAL CONFIRMACIÓN DE ELIMINACIÓN --- */}
        <ModalConfirmacion 
          isOpen={!!areaAEliminar}
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar el departamento <strong>"${areaAEliminar?.nombre}"</strong>? Esta acción es permanente y no se puede deshacer.`}
          onConfirm={confirmarEliminarArea}
          onCancel={() => setAreaAEliminar(null)}
          theme={theme}
          modoOscuro={modoOscuro}
        />

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    </div>
  );
}
