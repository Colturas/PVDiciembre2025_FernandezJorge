# Sistema de Turnos Médicos - MediCare+ (En Español)

## ✅ Archivos Traducidos al Español

El proyecto ahora usa nombres de archivos y funciones en **ESPAÑOL** para mayor claridad.

### Nuevos Archivos Creados:

**Contextos:**

- `src/context/ContextoAutenticacion.jsx` - Manejo de autenticación
- `src/context/ContextoTurnos.jsx` - Manejo de turnos médicos

**Hooks (Funcionalidades Reutilizables):**

- `src/hooks/useDatos.js` - Datos de médicos, turnos y usuarios
- `src/hooks/useFormulario.js` - Gestión de formularios

**Componentes:**

- `src/components/Encabezado.jsx` - Navegación principal
- `src/components/Inicio.jsx` - Página de inicio
- `src/components/IniciarSesion.jsx` - Pantalla de login
- `src/components/Registrarse.jsx` - Pantalla de registro
- `src/components/PanelPaciente.jsx` - Dashboard del paciente
- `src/components/PanelMedico.jsx` - Dashboard del médico
- `src/components/RutaPrivada.jsx` - Protección de rutas
- `src/components/PaginasError.jsx` - Páginas de error 404 y 403

### Archivos Originales (Aún Existentes):

Los archivos originales en inglés aún están en el proyecto. Si quieres limpiar el proyecto, puedes eliminarlos:

```bash
# Eliminar archivos viejos (opcional)
rm src/context/AuthContext.jsx
rm src/context/AppointmentContext.jsx
rm src/hooks/useForm.js
rm src/hooks/useData.js
rm src/components/Header.jsx
rm src/components/Home.jsx
rm src/components/Login.jsx
rm src/components/Register.jsx
rm src/components/PatientDashboard.jsx
rm src/components/DoctorDashboard.jsx
rm src/components/PrivateRoute.jsx
rm src/components/ErrorPages.jsx
```

## 🚀 Cómo Iniciar

```bash
# En el directorio del proyecto
cd PVDICIEMBRE2025_FERNANDEZJORGE

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5174`

## 📝 Credenciales de Prueba

### Médicos:

- **Email:** dr.juan@medicare.com | **Contraseña:** 123456
- **Email:** dra.maria@medicare.com | **Contraseña:** 123456
- **Email:** dr.carlos@medicare.com | **Contraseña:** 123456

### Paciente:

- **Email:** juan.perez@gmail.com | **Contraseña:** 123456

## 📋 Requisitos Cumplidos

✅ Sistema de Turnos Médicos
✅ Login y Registro de usuarios
✅ Tipos de usuario (Paciente y Médico)
✅ Selección de turnos con médicos disponibles
✅ Turnos de mañana solamente, mismo día
✅ Información completa del turno
✅ Repositorio GitHub (PVDiciembre2025_FernandezJorge)
✅ React Hooks personalizados
✅ Context API
✅ React Router DOM
✅ LocalStorage
✅ Validación de datos
✅ Diseño CSS profesional (azul/cyan sin grises)
✅ Gestión de errores

## 🎨 Diseño

- **Color Primario:** Azul oscuro (#0f3460)
- **Color Secundario:** Cian (#00bcd4)
- **Fondo:** Blanco y degradados suaves
- **Sin grises:** Todo en paleta azul/blanca/cian

## 📚 Estructura de Carpetas

```
src/
├── components/          # Componentes React
│   ├── Encabezado.jsx
│   ├── Inicio.jsx
│   ├── IniciarSesion.jsx
│   ├── Registrarse.jsx
│   ├── PanelPaciente.jsx
│   ├── PanelMedico.jsx
│   ├── RutaPrivada.jsx
│   └── PaginasError.jsx
├── context/            # Context API
│   ├── ContextoAutenticacion.jsx
│   └── ContextoTurnos.jsx
├── hooks/              # Hooks personalizados
│   ├── useFormulario.js
│   └── useDatos.js
├── styles/             # Estilos CSS
│   ├── Auth.css
│   ├── Dashboard.css
│   ├── Home.css
│   ├── Header.css
│   ├── Error.css
│   └── index.css
└── App.jsx             # Componente principal
```

## 🔧 Variables Principales (Español)

| Original     | En Español       |
| ------------ | ---------------- |
| user         | usuario          |
| login        | iniciarSesion    |
| logout       | cerrarSesion     |
| userType     | tipoUsuario      |
| name         | nombre           |
| password     | contrasena       |
| appointments | turnos           |
| useAuth      | useAutenticacion |
| useForm      | useFormulario    |
| useData      | useDatos         |

---

**Última actualización:** Diciembre 7, 2025
