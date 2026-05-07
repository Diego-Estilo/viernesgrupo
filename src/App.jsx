import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Asistencia from './Asistencia';
import LoginGerente from './LoginGerente';
import PanelGerente from './PanelGerente';

function Home() {
  return (
    <div className="page-container">
      <div className="modern-card">
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏢</div>
        <h1 className="title">Sistema de Gestión</h1>
        <p className="subtitle">Selecciona el módulo de acceso</p>
        
        <div style={{ marginTop: '30px' }}>
            <Link to="/login" className="btn btn-primary">
              Módulo de Login (Asistencia)
            </Link>
            <Link to="/gerente-login" className="btn btn-success" style={{ marginTop: '15px' }}>
              Acceso Gerencial Exclusivo
            </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/asistencia" element={<Asistencia />} />
        <Route path="/gerente" element={<PanelGerente />} />
        <Route path="/gerente-login" element={<LoginGerente />} />
      </Routes>
    </Router>
  );
}

export default App;
