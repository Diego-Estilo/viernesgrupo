import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="page-container">
      <div className="modern-card">
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏛️</div>
        <h1 className="title">Asistencia App</h1>
        <p className="subtitle">Selecciona tu rol para continuar</p>

        <div style={{ marginTop: '30px' }}>
            <Link to="/asistencia" className="btn btn-primary" style={{ padding: '20px' }}>
                <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem' }}>Registro de Asistencia</strong>
                    <small style={{ fontWeight: 'normal', opacity: 0.8 }}>Entrada y salida de empleados</small>
                </div>
            </Link>

            <Link to="/gerente-login" className="btn btn-outline" style={{ padding: '20px' }}>
                <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem' }}>Panel Gerencial</strong>
                    <small style={{ fontWeight: 'normal', opacity: 0.8 }}>Reportes y estadísticas</small>
                </div>
            </Link>
        </div>

        <div style={{ marginTop: '30px', fontSize: '0.8rem', color: '#9ca3af' }}>
            v2.0 • React + Supabase
        </div>
      </div>
    </div>
  );
}
