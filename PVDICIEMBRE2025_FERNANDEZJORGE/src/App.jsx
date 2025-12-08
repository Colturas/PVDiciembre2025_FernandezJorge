import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorAutenticacion } from './context/ContextoAutenticacion';
import { ProveedorTurnos } from './context/ContextoTurnos';
import { RutaPrivada } from './components/RutaPrivada';
import { Inicio } from './components/Inicio';
import { IniciarSesion } from './components/IniciarSesion';
import { Registrarse } from './components/Registrarse';
import { PanelPaciente } from './components/PanelPaciente';
import { PanelMedico } from './components/PanelMedico';
import { NoEncontrado, AccesoNoAutorizado } from './components/PaginasError';
import './App.css';

function App() {
  return (
    <Router>
      <ProveedorAutenticacion>
        <ProveedorTurnos>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/registrarse" element={<Registrarse />} />
            <Route
              path="/panel-paciente"
              element={
                <RutaPrivada rolRequerido="paciente">
                  <PanelPaciente />
                </RutaPrivada>
              }
            />
            <Route
              path="/panel-medico"
              element={
                <RutaPrivada rolRequerido="medico">
                  <PanelMedico />
                </RutaPrivada>
              }
            />
            <Route path="/no-encontrado" element={<NoEncontrado />} />
            <Route path="/acceso-no-autorizado" element={<AccesoNoAutorizado />} />
            <Route path="*" element={<NoEncontrado />} />
          </Routes>
        </ProveedorTurnos>
      </ProveedorAutenticacion>
    </Router>
  );
}

export default App;
