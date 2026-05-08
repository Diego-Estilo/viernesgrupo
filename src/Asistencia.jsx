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

  // Centralización de Estilos (Clean Code)
  const theme = {
    bgPage: modoOscuro ? '#0f172a' : '#f1f5f9',
    cardBg: modoOscuro ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
    textPrimary: modoOscuro ? '#f8fafc' : '#0f172a',
    textSecondary: modoOscuro ? '#94a3b8' : '#64748b',
    inputBg: modoOscuro ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
    inputBorder: modoOscuro ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
    inputText: modoOscuro ? '#ffffff' : '#000000',
    accent: modoOscuro ? '#818cf8' : '#4f46e5',
    optionBg: modoOscuro ? '#1e293b' : '#ffffff'
  };

  return (
    <div className="page-container" style={{ backgroundColor: theme.bgPage, minHeight: '100vh', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}>
      
      {/* Esferas de fondo estilo Gerente */}
      {modoOscuro && (
        <>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }} />
        </>
      )}

      <div className="modern-card" style={{ backgroundColor: theme.cardBg, color: theme.textPrimary, backdropFilter: modoOscuro ? 'blur(20px)' : 'none', border: `1px solid ${theme.inputBorder}`, boxShadow: modoOscuro ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 10px 25px -5px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }}>
        <h1 className="title" style={{ color: theme.textPrimary }}>Registro de Asistencia</h1>
        <p className="subtitle" style={{ color: theme.textSecondary }}>Introduce tus datos para marcar hoy</p>
        
        <div style={{ margin: '20px 0', padding: '20px', background: theme.inputBg, borderRadius: '12px', border: `1px solid ${theme.inputBorder}` }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: theme.accent }}>
            {tiempo.toLocaleTimeString('es-ES')}
          </div>
          <div style={{ color: theme.textSecondary, fontSize: '0.9rem', marginTop: '5px' }}>
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
            style={{ backgroundColor: theme.inputBg, color: theme.inputText, borderColor: theme.inputBorder }}
          />
        </div>

        <div className="input-group">
          <label className="input-label" style={{ color: modoOscuro ? '#cbd5e1' : '#475569' }}>Departamento</label>
          <select 
            className="modern-input"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            disabled={cargando}
            style={{ backgroundColor: theme.inputBg, color: theme.inputText, borderColor: theme.inputBorder, WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
          >
            <option value="" style={{ backgroundColor: theme.optionBg, color: theme.textPrimary }}>Seleccione...</option>
            <option value="Ventas" style={{ backgroundColor: theme.optionBg, color: theme.textPrimary }}>Ventas</option>
            <option value="Marketing" style={{ backgroundColor: theme.optionBg, color: theme.textPrimary }}>Marketing</option>
            <option value="Desarrollo" style={{ backgroundColor: theme.optionBg, color: theme.textPrimary }}>Desarrollo</option>
            <option value="Administración" style={{ backgroundColor: theme.optionBg, color: theme.textPrimary }}>Administración</option>
            <option value="Finanzas" style={{ backgroundColor: theme.optionBg, color: theme.textPrimary }}>Finanzas</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label" style={{ color: modoOscuro ? '#cbd5e1' : '#475569' }}>Bloque de Horario</label>
          <select 
            className="modern-input"
            value={bloque}
            onChange={(e) => setBloque(e.target.value)}
            disabled={cargando}
            style={{ backgroundColor: theme.inputBg, color: theme.inputText, borderColor: theme.inputBorder, WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
          >
            <option value="" style={{ backgroundColor: theme.optionBg, color: theme.textPrimary }}>Seleccione...</option>
            <option value="Mañana (6am - 2pm)" style={{ backgroundColor: theme.optionBg, color: theme.textPrimary }}>Mañana (6am - 2pm)</option>
            <option value="Tarde (2pm - 10pm)" style={{ backgroundColor: theme.optionBg, color: theme.textPrimary }}>Tarde (2pm - 10pm)</option>
            <option value="Noche (10pm - 6am)" style={{ backgroundColor: theme.optionBg, color: theme.textPrimary }}>Noche (10pm - 6am)</option>
          </select>
        </div>

        {mensaje.texto && (
          <div style={{ 
            padding: '12px', 
            marginBottom: '15px', 
            borderRadius: '8px', 
            fontSize: '0.95rem',
            fontWeight: '500',
            background: mensaje.tipo === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            color: mensaje.tipo === 'error' ? (modoOscuro ? '#fca5a5' : '#991b1b') : (modoOscuro ? '#6ee7b7' : '#065f46'),
            border: modoOscuro ? `1px solid ${mensaje.tipo === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}` : 'none'
          }}>
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
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-outline"
            style={{ color: modoOscuro ? '#94a3b8' : '#64748b', borderColor: modoOscuro ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
          >
            🚪 Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
