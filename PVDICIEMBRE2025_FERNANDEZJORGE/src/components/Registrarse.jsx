import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import { useUsuarios } from '../hooks/useDatos';
import { useFormulario } from '../hooks/useFormulario';
import '../styles/Auth.css';

// Componente para el registro de nuevos usuarios (pacientes y médicos)
export const Registrarse = () => {
  const navegar = useNavigate();
  const { registrarse } = useAutenticacion();
  const { agregarUsuario, buscarUsuarioPorEmail, buscarUsuarioPorDNI, buscarUsuarioPorTelefono } = useUsuarios();
  const [errorGlobal, setErrorGlobal] = useState('');

  const { valores, errores, tocados, manejarCambio, manejarDesenfoque, manejarEnvio, establecerErrorCampo } = useFormulario(
    {
      nombre: '',
      email: '',
      contrasena: '',
      confirmarContrasena: '',
      tipoUsuario: 'paciente',
      dni: '',
      telefono: '',
      edad: '',
      especialidad: '',
      obraSocial: 'PAMI',
    },
    (valoresFormulario) => {
      // Validación de todos los campos del formulario
      setErrorGlobal('');
      let hayErrores = false;

      // Validar nombre
      if (!valoresFormulario.nombre.trim()) {
        establecerErrorCampo('nombre', 'El nombre es requerido');
        hayErrores = true;
      }
      // Validar email y verificar que no esté registrado
      if (!valoresFormulario.email) {
        establecerErrorCampo('email', 'El correo es requerido');
        hayErrores = true;
      } else if (!/\S+@\S+\.\S+/.test(valoresFormulario.email)) {
        establecerErrorCampo('email', 'El correo no es válido');
        hayErrores = true;
      } else if (buscarUsuarioPorEmail(valoresFormulario.email)) {
        establecerErrorCampo('email', 'Este correo ya está registrado');
        hayErrores = true;
      }
      if (!valoresFormulario.contrasena) {
        establecerErrorCampo('contrasena', 'La contraseña es requerida');
        hayErrores = true;
      } else if (valoresFormulario.contrasena.length < 6) {
        establecerErrorCampo('contrasena', 'La contraseña debe tener al menos 6 caracteres');
        hayErrores = true;
      }
      if (valoresFormulario.contrasena !== valoresFormulario.confirmarContrasena) {
        establecerErrorCampo('confirmarContrasena', 'Las contraseñas no coinciden');
        hayErrores = true;
      }
      if (!valoresFormulario.dni.trim()) {
        establecerErrorCampo('dni', 'El DNI es requerido');
        hayErrores = true;
      } else if (buscarUsuarioPorDNI(valoresFormulario.dni)) {
        establecerErrorCampo('dni', 'Este DNI ya está registrado');
        hayErrores = true;
      }
      if (!valoresFormulario.telefono.trim()) {
        establecerErrorCampo('telefono', 'El teléfono es requerido');
        hayErrores = true;
      } else if (buscarUsuarioPorTelefono(valoresFormulario.telefono)) {
        establecerErrorCampo('telefono', 'Este teléfono ya está registrado');
        hayErrores = true;
      }

      if (valoresFormulario.tipoUsuario === 'paciente') {
        if (!valoresFormulario.edad) {
          establecerErrorCampo('edad', 'La edad es requerida');
          hayErrores = true;
        }
      } else if (valoresFormulario.tipoUsuario === 'medico') {
        if (!valoresFormulario.especialidad.trim()) {
          establecerErrorCampo('especialidad', 'La especialidad es requerida');
          hayErrores = true;
        }
      }

      if (!hayErrores) {
        const nuevoUsuario = {
          id: Date.now(),
          nombre: valoresFormulario.nombre,
          email: valoresFormulario.email,
          contrasena: valoresFormulario.contrasena,
          tipoUsuario: valoresFormulario.tipoUsuario,
          dni: valoresFormulario.dni,
          telefono: valoresFormulario.telefono,
          obraSocial: valoresFormulario.obraSocial,
          ...(valoresFormulario.tipoUsuario === 'paciente' && { edad: valoresFormulario.edad }),
          ...(valoresFormulario.tipoUsuario === 'medico' && { especialidad: valoresFormulario.especialidad }),
          creadoEn: new Date().toISOString(),
        };

        agregarUsuario(nuevoUsuario);
        registrarse(nuevoUsuario);
        navegar(valoresFormulario.tipoUsuario === 'paciente' ? '/panel-paciente' : '/panel-medico');
      }
    }
  );

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <h1>Registrarse</h1>
        {errorGlobal && <div className="error-message">{errorGlobal}</div>}
        
        <form onSubmit={manejarEnvio}>
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                value={valores.nombre}
                onChange={manejarCambio}
                onBlur={manejarDesenfoque}
                className={tocados.nombre && errores.nombre ? 'input-error' : ''}
                placeholder="Tu nombre"
              />
              {tocados.nombre && errores.nombre && <span className="field-error">{errores.nombre}</span>}
            </div>

            <div className="form-group half">
              <label htmlFor="tipoUsuario">Tipo de Usuario</label>
              <select
                id="tipoUsuario"
                name="tipoUsuario"
                value={valores.tipoUsuario}
                onChange={manejarCambio}
              >
                <option value="paciente">Paciente</option>
                <option value="medico">Médico</option>
              </select>
            </div>
          </div>

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

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="dni">DNI/Cédula</label>
              <input
                id="dni"
                type="text"
                name="dni"
                value={valores.dni}
                onChange={manejarCambio}
                onBlur={manejarDesenfoque}
                className={tocados.dni && errores.dni ? 'input-error' : ''}
                placeholder="12345678"
              />
              {tocados.dni && errores.dni && <span className="field-error">{errores.dni}</span>}
            </div>

            <div className="form-group half">
              <label htmlFor="telefono">Teléfono</label>
              <input
                id="telefono"
                type="tel"
                name="telefono"
                value={valores.telefono}
                onChange={manejarCambio}
                onBlur={manejarDesenfoque}
                className={tocados.telefono && errores.telefono ? 'input-error' : ''}
                placeholder="+54 9 11 1234567"
              />
              {tocados.telefono && errores.telefono && <span className="field-error">{errores.telefono}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="obraSocial">Obra Social</label>
            <select
              id="obraSocial"
              name="obraSocial"
              value={valores.obraSocial}
              onChange={manejarCambio}
            >
              <option value="PAMI">PAMI</option>
              <option value="ISJ">ISJ</option>
              <option value="OSDE">OSDE</option>
            </select>
          </div>

          {valores.tipoUsuario === 'paciente' && (
            <div className="form-group">
              <label htmlFor="edad">Edad</label>
              <input
                id="edad"
                type="number"
                name="edad"
                value={valores.edad}
                onChange={manejarCambio}
                onBlur={manejarDesenfoque}
                className={tocados.edad && errores.edad ? 'input-error' : ''}
                placeholder="25"
                min="1"
                max="120"
              />
              {tocados.edad && errores.edad && <span className="field-error">{errores.edad}</span>}
            </div>
          )}

          {valores.tipoUsuario === 'medico' && (
            <div className="form-group">
              <label htmlFor="especialidad">Especialidad</label>
              <select
                id="especialidad"
                name="especialidad"
                value={valores.especialidad}
                onChange={manejarCambio}
                onBlur={manejarDesenfoque}
                className={tocados.especialidad && errores.especialidad ? 'input-error' : ''}
              >
                <option value="">Selecciona una especialidad</option>
                <option value="Cardiología">Cardiología</option>
                <option value="Neurología">Neurología</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Oftalmología">Oftalmología</option>
              </select>
              {tocados.especialidad && errores.especialidad && <span className="field-error">{errores.especialidad}</span>}
            </div>
          )}

          <div className="form-row">
            <div className="form-group half">
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

            <div className="form-group half">
              <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
              <input
                id="confirmarContrasena"
                type="password"
                name="confirmarContrasena"
                value={valores.confirmarContrasena}
                onChange={manejarCambio}
                onBlur={manejarDesenfoque}
                className={tocados.confirmarContrasena && errores.confirmarContrasena ? 'input-error' : ''}
                placeholder="••••••••"
              />
              {tocados.confirmarContrasena && errores.confirmarContrasena && <span className="field-error">{errores.confirmarContrasena}</span>}
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Registrarse
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <a href="/iniciar-sesion">Inicia sesión aquí</a>
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
