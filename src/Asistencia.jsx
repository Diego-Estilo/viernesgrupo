import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function Asistencia({ modoOscuro }) {
  const navigate = useNavigate();
  const [tiempo, setTiempo] = useState(new Date());
  const [nombre, setNombre] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [bloque, setBloque] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTiempo(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const registrarAsistencia = async (tipo) => {
    if (!nombre.trim() || !departamento || !bloque) {
      setMensaje({ texto: '⚠️ Ingresa tu nombre, departamento y bloque', tipo: 'error' });
      return;
    }

    setCargando(true);
    setMensaje({ texto: `Registrando ${tipo}...`, tipo: '' });

    try {
      const ahora = new Date();
      const fecha = ahora.toISOString().split('T')[0];
      // Supabase espera un timestamp completo con zona horaria
      const horaStr = ahora.toISOString(); 

      const { error } = await supabase
        .from('asistencias')
        .insert([{
          nombre: nombre,
          departamento: departamento,
          bloque: bloque,
          fecha: fecha,
          hora_registro: horaStr,
          tipo_registro: tipo
        }]);

      if (error) throw error;

      setMensaje({ texto: `✅ ${tipo.toUpperCase()} registrada con éxito`, tipo: 'exito' });
      setNombre(''); // Limpiamos para el siguiente empleado
    } catch (err) {
      console.error(err);
      setMensaje({ texto: `❌ Error en Supabase: ${err.message || err.details || 'Desconocido'}`, tipo: 'error' });
    }
    setCargando(false);
  };

  return (
    <div className="page-container" style={{ backgroundColor: modoOscuro ? '#0f172a' : '#f1f5f9', minHeight: '100vh', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}>
      
      {/* Esferas de fondo estilo Gerente */}
      {modoOscuro && (
        <>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }}></div>
        </>
      )}

      <div className="modern-card" style={{ backgroundColor: modoOscuro ? 'rgba(255, 255, 255, 0.03)' : '#ffffff', color: modoOscuro ? '#f8fafc' : '#0f172a', backdropFilter: modoOscuro ? 'blur(20px)' : 'none', border: modoOscuro ? '1px solid rgba(255, 255, 255, 0.1)' : 'none', boxShadow: modoOscuro ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 10px 25px -5px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }}>
        <h1 className="title" style={{ color: modoOscuro ? '#f8fafc' : '#0f172a' }}>Registro de Asistencia</h1>
        <p className="subtitle" style={{ color: modoOscuro ? '#94a3b8' : '#64748b' }}>Introduce tus datos para marcar hoy</p>
        
        <div style={{ margin: '20px 0', padding: '20px', background: modoOscuro ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc', borderRadius: '12px', border: `1px solid ${modoOscuro ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'}` }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: modoOscuro ? '#818cf8' : '#4f46e5' }}>
            {tiempo.toLocaleTimeString('es-ES')}
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '5px' }}>
            {tiempo.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" style={{ color: modoOscuro ? '#cbd5e1' : '#475569' }}>Nombre del Empleado</label>
          <input 
            type="text" 
            className="modern-input" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Pérez"
            disabled={cargando}
            style={{ backgroundColor: modoOscuro ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: modoOscuro ? '#ffffff' : '#000000', borderColor: modoOscuro ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Departamento</label>
          <select 
            className="modern-input"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            disabled={cargando}
            style={{ backgroundColor: modoOscuro ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: modoOscuro ? '#ffffff' : '#000000', borderColor: modoOscuro ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}
          >
            <option value="">Seleccione...</option>
            <option value="Ventas">Ventas</option>
            <option value="Marketing">Marketing</option>
            <option value="Desarrollo">Desarrollo</option>
            <option value="Administración">Administración</option>
            <option value="Finanzas">Finanzas</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Bloque de Horario</label>
          <select 
            className="modern-input"
            value={bloque}
            onChange={(e) => setBloque(e.target.value)}
            disabled={cargando}
            style={{ backgroundColor: modoOscuro ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: modoOscuro ? '#ffffff' : '#000000', borderColor: modoOscuro ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}
          >
            <option value="">Seleccione...</option>
            <option value="Mañana (6am - 2pm)">Mañana (6am - 2pm)</option>
            <option value="Tarde (2pm - 10pm)">Tarde (2pm - 10pm)</option>
            <option value="Noche (10pm - 6am)">Noche (10pm - 6am)</option>
          </select>
        </div>

        {mensaje.texto && (
          <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '8px', background: mensaje.tipo === 'error' ? '#fee2e2' : '#d1fae5', color: mensaje.tipo === 'error' ? '#991b1b' : '#065f46' }}>
              {mensaje.texto}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button 
            className="btn btn-success" 
            onClick={() => registrarAsistencia('entrada')}
            disabled={cargando}
          >
            ✅ Entrada
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => registrarAsistencia('salida')}
            disabled={cargando}
          >
            ❌ Salida
          </button>
        </div>

        <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: `1px solid ${modoOscuro ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb'}` }}>
          <button onClick={() => navigate('/')} className="btn btn-outline">
            🚪 Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
