import { useNavigate } from 'react-router-dom';
import { Encabezado } from './Encabezado';
import '../styles/Home.css';

export const Inicio = () => {
  const navegar = useNavigate();

  const medicos = [
    {
      id: 1,
      nombre: 'Dr. Juan García',
      especialidad: 'Cardiología',
      experiencia: 15,
      email: 'dr.juan@medicare.com',
      imagen: '👨‍⚕️',
    },
    {
      id: 2,
      nombre: 'Dra. María López',
      especialidad: 'Neurología',
      experiencia: 12,
      email: 'dra.maria@medicare.com',
      imagen: '👩‍⚕️',
    },
    {
      id: 3,
      nombre: 'Dr. Carlos Rodríguez',
      especialidad: 'Dermatología',
      experiencia: 10,
      email: 'dr.carlos@medicare.com',
      imagen: '👨‍⚕️',
    },
  ];

  return (
    <>
      <Encabezado />
      <div className="home-container">
        {/* Sección Hero */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Centro Médico Integral MediCare+</h1>
            <p>Tu salud es nuestra prioridad. Agenda tus consultas de forma rápida y segura.</p>
            <div className="hero-buttons">
              <button onClick={() => navegar('/iniciar-sesion')} className="btn-primary-large">
                Acceder Ahora
              </button>
              <button onClick={() => navegar('/registrarse')} className="btn-secondary-large">
                Registrarse
              </button>
            </div>
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

        {/* Sección Médicos */}
        <section className="doctors-section">
          <h2>Nuestros Médicos</h2>
          <p className="section-subtitle">Conoce a nuestro equipo de profesionales especializados</p>
          <div className="doctors-grid">
            {medicos.map(medico => (
              <div key={medico.id} className="doctor-card">
                <div className="doctor-image">{medico.imagen}</div>
                <h3>{medico.nombre}</h3>
                <p className="specialty">{medico.especialidad}</p>
                <p className="experience">{medico.experiencia} años de experiencia</p>
                <p className="email">{medico.email}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección Servicios */}
        <section className="services-section">
          <h2>Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3>Consultas Generales</h3>
              <p>Evaluación médica completa con nuestros especialistas</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3>Diagnósticos</h3>
              <p>Estudios y análisis con tecnología de punta</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💊</div>
              <h3>Tratamientos</h3>
              <p>Planes de tratamiento personalizados</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3>Seguimiento</h3>
              <p>Control y seguimiento de tu salud</p>
            </div>
          </div>
        </section>

        {/* Sección CTA */}
        <section className="cta-section">
          <h2>¿Listo para cuidar tu salud?</h2>
          <p>Agenda tu cita ahora mismo</p>
          <button onClick={() => navegar('/registrarse')} className="btn-primary-large">
            Comenzar Ahora
          </button>
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
