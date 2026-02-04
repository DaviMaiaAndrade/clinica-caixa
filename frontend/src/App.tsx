import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Especialidades from './pages/Especialidades';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/medicos" element={<div className="p-6">Médicos (em breve)</div>} />
          <Route path="/consultas" element={<div className="p-6">Consultas (em breve)</div>} />
          <Route path="/relatorios" element={<div className="p-6">Relatórios (em breve)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;