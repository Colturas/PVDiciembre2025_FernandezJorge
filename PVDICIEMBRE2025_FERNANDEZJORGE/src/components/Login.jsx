import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../hooks/useData';
import { useForm } from '../hooks/useForm';
import '../styles/Auth.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { validateLogin } = useUsers();
  const [globalError, setGlobalError] = useState('');

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldError, isSubmitting } = useForm(
    { email: '', password: '' },
    (formValues) => {
      setGlobalError('');
      
      if (!formValues.email) {
        setFieldError('email', 'El correo es requerido');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        setFieldError('email', 'El correo no es válido');
        return;
      }
      if (!formValues.password) {
        setFieldError('password', 'La contraseña es requerida');
        return;
      }

      const user = validateLogin(formValues.email, formValues.password);
      if (user) {
        login(user);
        navigate(user.userType === 'paciente' ? '/patient-dashboard' : '/doctor-dashboard');
      } else {
        setGlobalError('Correo o contraseña incorrectos');
      }
    }
  );

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Iniciar Sesión</h1>
        {globalError && <div className="error-message">{globalError}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? 'input-error' : ''}
              placeholder="tu@correo.com"
            />
            {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.password && errors.password ? 'input-error' : ''}
              placeholder="••••••••"
            />
            {touched.password && errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-primary" disabled={errors.email || errors.password}>
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta? <a href="/register">Registrate aquí</a>
        </p>
      </div>
    </div>
  );
};
