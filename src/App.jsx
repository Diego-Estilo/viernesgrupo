import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Asistencia from './Asistencia';
import LoginGerente from './LoginGerente';
import PanelGerente from './PanelGerente';
import RegistroGerente from './RegistroGerente';

function Home({ modoOscuro }) {
  return (
    <div className="page-container" style={{ backgroundColor: modoOscuro ? '#0f172a' : '#f1f5f9', minHeight: '100vh', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden' }}>
      
      {/* Esferas de fondo para modo oscuro */}
      {modoOscuro && (
        <>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, rgba(236,72,153,0) 70%)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }}></div>
        </>
      )}

      <div className="modern-card" style={{ backgroundColor: modoOscuro ? 'rgba(255, 255, 255, 0.03)' : '#ffffff', color: modoOscuro ? '#f8fafc' : '#0f172a', backdropFilter: modoOscuro ? 'blur(20px)' : 'none', border: modoOscuro ? '1px solid rgba(255, 255, 255, 0.1)' : 'none', boxShadow: modoOscuro ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 10px 25px -5px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏢</div>
        <h1 className="title" style={{ color: modoOscuro ? '#f8fafc' : '#0f172a' }}>Sistema de Gestión</h1>
        <p className="subtitle" style={{ color: modoOscuro ? '#94a3b8' : '#64748b' }}>Selecciona el módulo de acceso</p>
        
        <div style={{ marginTop: '30px' }}>
            <Link to="/asistencia" className="btn btn-primary">
              Acceso a Registro de Asistencia
            </Link>
            <Link to="/gerente-login" className="btn btn-success" style={{ marginTop: '15px' }}>
              Acceso Gerencial Exclusivo
            </Link>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const [modoOscuro, setModoOscuro] = useState(() => localStorage.getItem('theme_global') === 'true');

  useEffect(() => {
    localStorage.setItem('theme_global', modoOscuro);
  }, [modoOscuro]);

  const pathsPermitidos = ['/', '/asistencia', '/gerente-login', '/registro-gerente'];
  const mostrarBoton = pathsPermitidos.includes(location.pathname);

  return (
    <>
      {mostrarBoton && (
        <button 
          onClick={() => setModoOscuro(!modoOscuro)}
          style={{
            position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
            width: '45px', height: '45px', borderRadius: '50%', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', transition: 'all 0.3s ease',
            backgroundColor: modoOscuro ? '#ffffff' : '#1e293b',
            color: modoOscuro ? '#1e293b' : '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
          title={modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {modoOscuro ? '☀️' : '🌙'}
        </button>
      )}
      <Routes>
        <Route path="/" element={<Home modoOscuro={modoOscuro} />} />
        <Route path="/asistencia" element={<Asistencia modoOscuro={modoOscuro} />} />
        <Route path="/gerente" element={<PanelGerente modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />} />
        <Route path="/gerente-login" element={<LoginGerente modoOscuro={modoOscuro} />} />
        <Route path="/registro-gerente" element={<RegistroGerente modoOscuro={modoOscuro} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
