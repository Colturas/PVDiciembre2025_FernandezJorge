import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../hooks/useData';
import { useForm } from '../hooks/useForm';
import '../styles/Auth.css';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addUser, findUserByEmail } = useUsers();
  const [globalError, setGlobalError] = useState('');

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldError } = useForm(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'paciente',
      dni: '',
      phone: '',
      age: '',
      specialty: '',
    },
    (formValues) => {
      setGlobalError('');
      let hasErrors = false;

      if (!formValues.name.trim()) {
        setFieldError('name', 'El nombre es requerido');
        hasErrors = true;
      }
      if (!formValues.email) {
        setFieldError('email', 'El correo es requerido');
        hasErrors = true;
      } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        setFieldError('email', 'El correo no es válido');
        hasErrors = true;
      } else if (findUserByEmail(formValues.email)) {
        setFieldError('email', 'Este correo ya está registrado');
        hasErrors = true;
      }
      if (!formValues.password) {
        setFieldError('password', 'La contraseña es requerida');
        hasErrors = true;
      } else if (formValues.password.length < 6) {
        setFieldError('password', 'La contraseña debe tener al menos 6 caracteres');
        hasErrors = true;
      }
      if (formValues.password !== formValues.confirmPassword) {
        setFieldError('confirmPassword', 'Las contraseñas no coinciden');
        hasErrors = true;
      }
      if (!formValues.dni.trim()) {
        setFieldError('dni', 'El DNI es requerido');
        hasErrors = true;
      }
      if (!formValues.phone.trim()) {
        setFieldError('phone', 'El teléfono es requerido');
        hasErrors = true;
      }

      if (formValues.userType === 'paciente') {
        if (!formValues.age) {
          setFieldError('age', 'La edad es requerida');
          hasErrors = true;
        }
      } else if (formValues.userType === 'medico') {
        if (!formValues.specialty.trim()) {
          setFieldError('specialty', 'La especialidad es requerida');
          hasErrors = true;
        }
      }

      if (!hasErrors) {
        const newUser = {
          id: Date.now(),
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
          userType: formValues.userType,
          dni: formValues.dni,
          phone: formValues.phone,
          ...(formValues.userType === 'paciente' && { age: formValues.age }),
          ...(formValues.userType === 'medico' && { specialty: formValues.specialty }),
          createdAt: new Date().toISOString(),
        };

        addUser(newUser);
        register(newUser);
        navigate(formValues.userType === 'paciente' ? '/patient-dashboard' : '/doctor-dashboard');
      }
    }
  );

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <h1>Registrarse</h1>
        {globalError && <div className="error-message">{globalError}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="name">Nombre Completo</label>
              <input
                id="name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.name && errors.name ? 'input-error' : ''}
                placeholder="Tu nombre"
              />
              {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group half">
              <label htmlFor="userType">Tipo de Usuario</label>
              <select
                id="userType"
                name="userType"
                value={values.userType}
                onChange={handleChange}
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
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? 'input-error' : ''}
              placeholder="tu@correo.com"
            />
            {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="dni">DNI/Cédula</label>
              <input
                id="dni"
                type="text"
                name="dni"
                value={values.dni}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.dni && errors.dni ? 'input-error' : ''}
                placeholder="12345678"
              />
              {touched.dni && errors.dni && <span className="field-error">{errors.dni}</span>}
            </div>

            <div className="form-group half">
              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.phone && errors.phone ? 'input-error' : ''}
                placeholder="+54 9 11 1234567"
              />
              {touched.phone && errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
          </div>

          {values.userType === 'paciente' && (
            <div className="form-group">
              <label htmlFor="age">Edad</label>
              <input
                id="age"
                type="number"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.age && errors.age ? 'input-error' : ''}
                placeholder="25"
                min="1"
                max="120"
              />
              {touched.age && errors.age && <span className="field-error">{errors.age}</span>}
            </div>
          )}

          {values.userType === 'medico' && (
            <div className="form-group">
              <label htmlFor="specialty">Especialidad</label>
              <select
                id="specialty"
                name="specialty"
                value={values.specialty}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.specialty && errors.specialty ? 'input-error' : ''}
              >
                <option value="">Selecciona una especialidad</option>
                <option value="Cardiología">Cardiología</option>
                <option value="Neurología">Neurología</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Oftalmología">Oftalmología</option>
              </select>
              {touched.specialty && errors.specialty && <span className="field-error">{errors.specialty}</span>}
            </div>
          )}

          <div className="form-row">
            <div className="form-group half">
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

            <div className="form-group half">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}
                placeholder="••••••••"
              />
              {touched.confirmPassword && errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Registrarse
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
};
