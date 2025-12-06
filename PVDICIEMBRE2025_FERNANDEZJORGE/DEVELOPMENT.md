# Sistema de Turnos Médicos - Guía de Desarrollo

## Estructura de Carpetas

```
src/
├── components/        # Componentes React
├── context/          # Context API
├── hooks/            # Custom Hooks
├── styles/           # Archivos CSS
└── assets/           # Imágenes y recursos
```

## Cómo Agregar Nuevas Características

### 1. Agregar un nuevo componente
```bash
# Crear archivo en src/components/NuevoComponente.jsx
```

### 2. Usar Context API
```jsx
import { useAuth } from '../context/AuthContext';

const MiComponente = () => {
  const { user } = useAuth();
  // Tu código
};
```

### 3. Crear un Custom Hook
```jsx
// src/hooks/miHook.js
export const useMiHook = () => {
  // Lógica del hook
};
```

## Variables de Entorno

Copia `.env.example` a `.env.local` y actualiza si es necesario:
```
VITE_API_BASE_URL=tu_url_aqui
```

## Git Workflow

```bash
# Crear rama para nueva característica
git checkout -b feature/nombre-caracteristica

# Hacer cambios y commits
git add .
git commit -m "Agregar descripción clara"

# Push a rama
git push origin feature/nombre-caracteristica

# Crear Pull Request en GitHub
```

## Testing Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Notas de Desarrollo

- Los datos se almacenan en LocalStorage
- Las rutas protegidas verifican el rol del usuario
- Los formularios validan en cliente
- Los estilos CSS están organizados por sección
