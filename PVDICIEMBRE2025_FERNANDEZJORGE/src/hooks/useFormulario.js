import { useState } from 'react';

// Hook personalizado para manejar el estado y validación de formularios
export const useFormulario = (valoresIniciales, alEnviar) => {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [enviando, setEnviando] = useState(false);

  // Actualiza los valores del formulario cuando el usuario escribe
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setValores(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpia los errores cuando el usuario comienza a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Marca un campo como tocado cuando pierde el foco
  const manejarDesenfoque = (e) => {
    const { name } = e.target;
    setTocados(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  // Procesa el envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await alEnviar(valores);
    } catch (error) {
      console.error('Error en formulario:', error);
    } finally {
      setEnviando(false);
    }
  };

  // Establece un error en un campo específico
  const establecerErrorCampo = (campo, error) => {
    setErrores(prev => ({
      ...prev,
      [campo]: error,
    }));
    setTocados(prev => ({
      ...prev,
      [campo]: true,
    }));
  };

  // Reinicia el formulario a su estado inicial
  const limpiarFormulario = () => {
    setValores(valoresIniciales);
    setErrores({});
    setTocados({});
  };

  return {
    valores,
    errores,
    tocados,
    enviando,
    manejarCambio,
    manejarDesenfoque,
    manejarEnvio,
    establecerErrorCampo,
    limpiarFormulario,
    setValores,
  };
};
