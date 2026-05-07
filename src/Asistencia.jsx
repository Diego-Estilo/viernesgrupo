import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function Asistencia() {
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
    <div className="page-container">
      <div className="modern-card">
        <h1 className="title">Registro de Asistencia</h1>
        <p className="subtitle">Introduce tus datos para marcar hoy</p>
        
        <div style={{ margin: '20px 0', padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4f46e5' }}>
            {tiempo.toLocaleTimeString('es-ES')}
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '5px' }}>
            {tiempo.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Nombre del Empleado</label>
          <input 
            type="text" 
            className="modern-input" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Pérez"
            disabled={cargando}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Departamento</label>
          <select 
            className="modern-input"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            disabled={cargando}
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

        <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
          <button onClick={() => navigate('/')} className="btn btn-outline">
            🚪 Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
