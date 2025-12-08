# GUÍA DE RENOMBRADO DE ARCHIVOS - ESPAÑOL

## Cambios ya realizados ✅

- ✅ App.jsx - Actualizado con nuevos nombres
- ✅ ContextoAutenticacion.jsx - Creado (reemplaza AuthContext.jsx)
- ✅ ContextoTurnos.jsx - Creado (reemplaza AppointmentContext.jsx)
- ✅ useFormulario.js - Creado (reemplaza useForm.js)
- ✅ useDatos.js - Creado (reemplaza useData.js)
- ✅ IniciarSesion.jsx - Creado (reemplaza Login.jsx)
- ✅ Registrarse.jsx - Creado (reemplaza Register.jsx)

## Pendientes de crear (por orden de prioridad)

### Componentes principales (URGENTE - CREAR AHORA)

1. **Encabezado.jsx** (reemplaza Header.jsx)

   - Mismo contenido que Header.jsx
   - Cambiar imports de `useAuth` a `useAutenticacion`
   - Cambiar `user` a `usuario`, `logout` a `cerrarSesion`

2. **Inicio.jsx** (reemplaza Home.jsx)

   - Mismo contenido que Home.jsx
   - Cambiar imports y rutas a nuevos nombres

3. **PanelPaciente.jsx** (reemplaza PatientDashboard.jsx)

   - Mismo contenido que PatientDashboard.jsx
   - Cambiar imports y referencias

4. **PanelMedico.jsx** (reemplaza DoctorDashboard.jsx)
   - Mismo contenido que DoctorDashboard.jsx
   - Cambiar imports y referencias

### Componentes de soporte (IMPORTANTE)

5. **RutaPrivada.jsx** (reemplaza PrivateRoute.jsx)

   - Mismo contenido que PrivateRoute.jsx
   - Cambiar imports y props

6. **PaginasError.jsx** (reemplaza ErrorPages.jsx)
   - Mismo contenido que ErrorPages.jsx
   - Cambiar componentes a: NoEncontrado y AccesoNoAutorizado

## INSTRUCCIONES PARA COMPLETAR

1. Los archivos nuevos en ESPAÑOL ya existen en el proyecto
2. Los archivos VIEJOS en INGLÉS deben seguir existiendo por ahora
3. Una vez que todos los archivos estén creados, debes eliminar los viejos
4. Asegúrate de que App.jsx importa de los nuevos archivos
5. Luego prueba el servidor con: npm run dev

## Mapeo de variables principales

```
user → usuario
login → iniciarSesion
logout → cerrarSesion
register → registrarse
userType → tipoUsuario
name → nombre
password → contrasena
email → email (igual)
appointments → turnos
addAppointment → agregarTurno
useAuth → useAutenticacion
useAppointments → useTurnos
useForm → useFormulario
useUsers → useUsuarios
```

## Recursos CSS (NO CAMBIAR NOMBRES)

- Auth.css → Auth.css (mismo)
- Dashboard.css → Dashboard.css (mismo)
- Home.css → Home.css (mismo)
- Header.css → Header.css (mismo)
- Error.css → Error.css (mismo)
- index.css → index.css (mismo)
