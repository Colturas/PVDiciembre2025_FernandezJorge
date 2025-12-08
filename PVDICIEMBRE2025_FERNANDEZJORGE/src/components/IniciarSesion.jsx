import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import { useUsuarios } from '../hooks/useDatos';
import { useFormulario } from '../hooks/useFormulario';
import '../styles/Auth.css';

export const IniciarSesion = () => {
  const navegar = useNavigate();
  const { iniciarSesion } = useAutenticacion();
  const { validarInicioSesion } = useUsuarios();
  const [errorGlobal, setErrorGlobal] = useState('');

  const { valores, errores, tocados, manejarCambio, manejarDesenfoque, manejarEnvio, establecerErrorCampo, enviando } = useFormulario(
    { email: '', contrasena: '' },
    (valoresFormulario) => {
      setErrorGlobal('');
      
      if (!valoresFormulario.email) {
        establecerErrorCampo('email', 'El correo es requerido');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(valoresFormulario.email)) {
        establecerErrorCampo('email', 'El correo no es válido');
        return;
      }
      if (!valoresFormulario.contrasena) {
        establecerErrorCampo('contrasena', 'La contraseña es requerida');
        return;
      }

      const usuario = validarInicioSesion(valoresFormulario.email, valoresFormulario.contrasena);
      if (usuario) {
        iniciarSesion(usuario);
        navegar(usuario.tipoUsuario === 'paciente' ? '/panel-paciente' : '/panel-medico');
      } else {
        setErrorGlobal('Correo o contraseña incorrectos');
      }
    }
  );

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Iniciar Sesión</h1>
        {errorGlobal && <div className="error-message">{errorGlobal}</div>}
        
        <form onSubmit={manejarEnvio}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              name="email"
              value={valores.email}
              onChange={manejarCambio}
              onBlur={manejarDesenfoque}
              className={tocados.email && errores.email ? 'input-error' : ''}
              placeholder="tu@correo.com"
            />
            {tocados.email && errores.email && <span className="field-error">{errores.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              name="contrasena"
              value={valores.contrasena}
              onChange={manejarCambio}
              onBlur={manejarDesenfoque}
              className={tocados.contrasena && errores.contrasena ? 'input-error' : ''}
              placeholder="••••••••"
            />
            {tocados.contrasena && errores.contrasena && <span className="field-error">{errores.contrasena}</span>}
          </div>

          <button type="submit" className="btn-primary" disabled={errores.email || errores.contrasena}>
            {enviando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta? <a href="/registrarse">Regístrate aquí</a>
        </p>
        <button 
          type="button"
          onClick={() => navegar('/')}
          className="btn-volver"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};
