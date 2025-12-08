import { useState } from 'react';

export const useFormulario = (valoresIniciales, alEnviar) => {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [enviando, setEnviando] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setValores(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const manejarDesenfoque = (e) => {
    const { name } = e.target;
    setTocados(prev => ({
      ...prev,
      [name]: true,
    }));
  };

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
