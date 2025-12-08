import { useNavigate } from 'react-router-dom';
import { Encabezado } from './Encabezado';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import '../styles/Home.css';

export const Inicio = () => {
  const navegar = useNavigate();
  const { usuario } = useAutenticacion();

  return (
    <>
      <Encabezado />
      <div className="home-container">
        {/* Sección Hero */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Centro Médico Integral MediCare+</h1>
            <p>Tu salud es nuestra prioridad. Agenda tus consultas de forma rápida y segura.</p>
            {!usuario ? (
              <div className="hero-buttons">
                <button onClick={() => navegar('/iniciar-sesion')} className="btn-primary-large">
                  Acceder Ahora
                </button>
                <button onClick={() => navegar('/registrarse')} className="btn-secondary-large">
                  Registrarse
                </button>
              </div>
            ) : (
              <div className="hero-buttons">
                <button onClick={() => navegar(usuario.tipoUsuario === 'paciente' ? '/panel-paciente' : '/panel-medico')} className="btn-primary-large">
                  Ir a Mi Panel
                </button>
              </div>
            )}
          </div>
          <div className="hero-image">
            <div className="medical-icon">🏥</div>
          </div>
        </section>

        {/* Sección Acerca De */}
        <section className="about-section">
          <h2>Sobre MediCare+</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                MediCare+ es un centro médico especializado en brindar servicios de salud de la más alta calidad.
                Con más de 20 años de experiencia, contamos con un equipo multidisciplinario de profesionales
                comprometidos con el bienestar de nuestros pacientes.
              </p>
              <div className="stats">
                <div className="stat">
                  <h3>20+</h3>
                  <p>Años de experiencia</p>
                </div>
                <div className="stat">
                  <h3>15+</h3>
                  <p>Especialidades</p>
                </div>
                <div className="stat">
                  <h3>5000+</h3>
                  <p>Pacientes atendidos</p>
                </div>
              </div>
            </div>
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">✓</div>
                <h4>Médicos Certificados</h4>
                <p>Profesionales especializados y certificados internacionalmente</p>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <h4>Tecnología Avanzada</h4>
                <p>Equipamiento moderno para diagnósticos precisos</p>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <h4>Atención 24/7</h4>
                <p>Disponibles para urgencias en cualquier momento</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pie de página */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>MediCare+</h4>
              <p>Centro Médico Integral de Excelencia</p>
            </div>
            <div className="footer-section">
              <h4>Contacto</h4>
              <p>📞 +54 (011) 4567-8900</p>
              <p>📧 info@medicare.com</p>
            </div>
            <div className="footer-section">
              <h4>Ubicación</h4>
              <p>Av. Principal 1234</p>
              <p>Buenos Aires, Argentina</p>
            </div>
            <div className="footer-section">
              <h4>Horarios</h4>
              <p>Lunes a Viernes: 08:00 - 19:00</p>
              <p>Sábados: 09:00 - 13:00</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 MediCare+. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </>
  );
};
