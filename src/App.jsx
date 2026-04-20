import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  GraduationCap, Lightbulb, Users, Award, Clock, BookOpen,
  Heart, Shield, Phone, MapPin, ExternalLink, ArrowRight, ChevronRight
} from 'lucide-react';
import './App.css';
import logoSantaMaria from './assets/logos/logo-santa-maria.png';
import logoSanMartin from './assets/logos/logo-san-martin.png';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

gsap.registerPlugin(ScrollTrigger);

const MAP_POSITION = [-8.373596666404865, -74.54289978098608];
const MAP_POSITION_INICIAL = [-8.37413686853864, -74.5431518177914];

const WA_BASE = "https://api.whatsapp.com/send/?phone=%2B51974135754&type=phone_number&app_absent=0";
const WA_GENERAL = `${WA_BASE}&text=Hola%2C%20me%20interesa%20información%20sobre%20Corporación%20Yeshua`;
const WA_INICIAL = `${WA_BASE}&text=Hola%2C%20me%20interesa%20información%20sobre%20Santa%20María%20de%20Guadalupe%20-%20Inicial`;
const WA_EBR    = `${WA_BASE}&text=Hola%2C%20me%20interesa%20información%20sobre%20Santa%20María%20de%20Guadalupe%20-%20Primaria%20y%20Secundaria`;
const WA_CEBA   = `${WA_BASE}&text=Hola%2C%20me%20interesa%20información%20sobre%20el%20CEBA%20San%20Martín%20de%20Porres`;

const NAV_ITEMS = [
  { id: 'inicio',        label: 'Inicio' },
  { id: 'nosotros',      label: 'Nosotros' },
  { id: 'instituciones', label: 'Instituciones' },
  { id: 'beneficios',    label: 'Beneficios' },
  { id: 'ubicacion',     label: 'Ubicación' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('inicio');
  const [scrolled, setScrolled] = React.useState(false);

  const scrollContainerRef = useRef(null);
  const heroRef            = useRef(null);
  const aboutRef           = useRef(null);
  const schoolsHeadingRef  = useRef(null);
  const cardsRef           = useRef([]);
  const locationRef        = useRef(null);

  // Track scroll position for navbar state + active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const scrollPos = window.scrollY + 120;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      gsap.from(heroRef.current.children, {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.1,
      });
      gsap.from(aboutRef.current.children, {
        scrollTrigger: { trigger: '.about-section', start: 'top 85%' },
        y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
      });
      gsap.from(schoolsHeadingRef.current, {
        scrollTrigger: { trigger: '.schools-section', start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
      gsap.from(cardsRef.current, {
        scrollTrigger: { trigger: '.schools-grid', start: 'top 80%' },
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
      });
      gsap.from('.feature-item', {
        scrollTrigger: { trigger: '.features-grid', start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      });
      gsap.from(locationRef.current, {
        scrollTrigger: { trigger: '.location-section', start: 'top 85%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="app-container">

      {/* ── Navbar ── */}
      <nav className={`navbar glass-panel${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">Corporación Yeshua</div>

          <button
            className={`nav-toggle${isMenuOpen ? ' open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>

          <ul className={`nav-links${isMenuOpen ? ' active' : ''}`}>
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeSection === id ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header id="inicio" className="hero">
        <div ref={heroRef} className="hero-content">
          <p className="hero-subtitle">Instituciones Educativas · Pucallpa, Perú</p>
          <h1>Corporación Yeshua SRL</h1>
          <p className="hero-description">
            Comprometidos con la excelencia educativa. Representamos instituciones de prestigio
            en Pucallpa, Perú, formando a los líderes del mañana con valores y calidad académica.
          </p>
          <div className="hero-cta-group">
            <a href="#instituciones" className="btn-primary">
              Conoce nuestras instituciones <ChevronRight size={18} />
            </a>
            <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Contáctanos <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">3</span>
              <span className="hero-stat-label">Instituciones</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">3</span>
              <span className="hero-stat-label">Niveles Educativos</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">MINEDU</span>
              <span className="hero-stat-label">Certificación Oficial</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Nosotros ── */}
      <section id="nosotros" className="about-section">
        <div className="about-content" ref={aboutRef}>
          <div className="about-text">
            <h2>Nuestra Misión y Visión</h2>
            <p>
              En la <strong>Corporación Yeshua SRL</strong> creemos firmemente que la educación es la base
              fundamental para transformar a la sociedad. Agrupamos instituciones enfocadas en
              diferentes niveles y modalidades para llegar a todos con necesidad de superación.
            </p>
            <p>
              Inculcamos los valores más altos de respeto, fe y equidad, con el objetivo de formar
              hombres y mujeres que impacten positivamente sus comunidades en la región de Pucallpa
              y todo el país.
            </p>
            <div className="about-values">
              <div className="value-badge"><GraduationCap size={17} /><span>Excelencia</span></div>
              <div className="value-badge"><Heart size={17} /><span>Compromiso</span></div>
              <div className="value-badge"><Lightbulb size={17} /><span>Innovación</span></div>
              <div className="value-badge"><Shield size={17} /><span>Valores</span></div>
            </div>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
              alt="Estudiantes compartiendo en el campus"
            />
          </div>
        </div>
      </section>

      {/* ── Instituciones ── */}
      <section id="instituciones" className="schools-section">
        <h2 ref={schoolsHeadingRef}>Nuestras Instituciones</h2>

        <div className="schools-scroll-viewport">
          <div className="scroll-hint-arrow" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="schools-grid" ref={scrollContainerRef}>

            {/* Colegio 1 — Inicial */}
            <div className="school-wrapper" ref={(el) => (cardsRef.current[0] = el)}>
              <div className="school-card glass-panel">
                <div className="logo-container">
                  <img src={logoSantaMaria} alt="Logo Santa María" className="school-logo" />
                </div>
                <div className="school-preview">
                  <img src="/santa-maria-inicial.jpg" alt="Colegio Santa María de Guadalupe Inicial" />
                </div>
                <h3>
                  Colegio E.B.R<br />"Santa María de Guadalupe"
                  <br /><span className="school-level">— GRADO INICIAL</span>
                </h3>
                <p>
                  <strong>Educación Básica Regular (Inicial).</strong><br /><br />
                  Brindamos un ambiente cálido, seguro y estimulante para los más pequeños.
                  Promovemos los valores cristianos y católicos. Nuestro modelo educativo asegura
                  un desarrollo psicomotriz, cognitivo y socioemocional óptimo.
                </p>
                <ul className="school-highlights">
                  <li>Educación Inicial especializada.</li>
                  <li>Docentes calificados para primera infancia.</li>
                  <li>Valores cristianos católicos.</li>
                </ul>
                <a href={WA_INICIAL} target="_blank" rel="noopener noreferrer" className="school-cta-btn">
                  Más información <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Colegio 2 — Primaria y Secundaria */}
            <div className="school-wrapper" ref={(el) => (cardsRef.current[1] = el)}>
              <div className="school-card glass-panel">
                <div className="logo-container">
                  <img src={logoSantaMaria} alt="Logo Santa María de Guadalupe" className="school-logo" />
                </div>
                <div className="school-preview">
                  <img src="/santa-maria-real.jpg" alt="Colegio Santa María de Guadalupe" />
                </div>
                <h3>
                  Colegio E.B.R<br />"Santa María de Guadalupe"
                  <br /><span className="school-level">— PRIMARIA Y SECUNDARIA</span>
                </h3>
                <p>
                  <strong>Educación Básica Regular.</strong><br /><br />
                  Formamos a niños y adolescentes a través de metodologías innovadoras. Promovemos
                  los valores cristianos y católicos. Nuestro modelo asegura bases académicas
                  competitivas con desarrollo socioemocional apoyado por tutores y psicólogos.
                </p>
                <ul className="school-highlights">
                  <li>Educación Primaria y Secundaria.</li>
                  <li>Docentes calificados.</li>
                  <li>Valores cristianos católicos.</li>
                </ul>
                <a href={WA_EBR} target="_blank" rel="noopener noreferrer" className="school-cta-btn">
                  Más información <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Colegio 3 — CEBA */}
            <div className="school-wrapper" ref={(el) => (cardsRef.current[2] = el)}>
              <div className="school-card glass-panel">
                <div className="logo-container">
                  <img src={logoSanMartin} alt="Logo San Martín de Porres" className="school-logo" />
                </div>
                <div className="school-preview">
                  <img src="/san-martin-real.jpg" alt="Colegio San Martín de Porres" />
                </div>
                <h3>Colegio E.B.A<br />"San Martín de Porres"</h3>
                <p>
                  <strong>Educación Básica Alternativa.</strong><br /><br />
                  Diseñado para jóvenes y adultos que desean culminar sus estudios sin descuidar
                  su vida laboral. Nuestros docentes usan andragogía combinada con herramientas
                  digitales modernas, garantizando certificación oficial del Ministerio de Educación.
                </p>
                <ul className="school-highlights">
                  <li>Termina la secundaria en corto tiempo.</li>
                  <li>Horarios sábados y domingos — virtual, presencial o a distancia.</li>
                  <li>Certificado válido por MINEDU.</li>
                </ul>
                <a href={WA_CEBA} target="_blank" rel="noopener noreferrer" className="school-cta-btn">
                  Más información <ArrowRight size={15} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Beneficios ── */}
      <section id="beneficios" className="features-section">
        <h2>¿Por qué elegirnos?</h2>
        <p className="features-subtitle">Comprometidos con la formación integral de cada estudiante</p>
        <div className="features-grid">
          <div className="feature-item glass-panel">
            <span className="feature-icon"><GraduationCap size={36} strokeWidth={1.5} /></span>
            <h3>Excelencia Académica</h3>
            <p>Plana docente capacitada, activa y en constante innovación metodológica.</p>
          </div>
          <div className="feature-item glass-panel">
            <span className="feature-icon"><Lightbulb size={36} strokeWidth={1.5} /></span>
            <h3>Entorno Moderno</h3>
            <p>Infraestructura adecuada para un aprendizaje efectivo, cómodo y seguro.</p>
          </div>
          <div className="feature-item glass-panel">
            <span className="feature-icon"><Users size={36} strokeWidth={1.5} /></span>
            <h3>Acompañamiento</h3>
            <p>Soporte personalizado enfocado en lo académico y la salud emocional.</p>
          </div>
          <div className="feature-item glass-panel">
            <span className="feature-icon"><Award size={36} strokeWidth={1.5} /></span>
            <h3>Certificación Oficial</h3>
            <p>Títulos y certificados válidos a nivel nacional, emitidos por el MINEDU.</p>
          </div>
          <div className="feature-item glass-panel">
            <span className="feature-icon"><Clock size={36} strokeWidth={1.5} /></span>
            <h3>Horarios Flexibles</h3>
            <p>Opciones presenciales, virtuales y a distancia adaptadas a tu estilo de vida.</p>
          </div>
          <div className="feature-item glass-panel">
            <span className="feature-icon"><BookOpen size={36} strokeWidth={1.5} /></span>
            <h3>Valores Sólidos</h3>
            <p>Formamos personas íntegras con principios éticos, espirituales y ciudadanos.</p>
          </div>
        </div>
      </section>

      {/* ── Ubicación ── */}
      <section id="ubicacion" className="location-section">
        <div ref={locationRef}>
          <h2>Nuestras Ubicaciones</h2>
          <p className="location-subtitle">Encuéntranos en el corazón de Pucallpa, Ucayali</p>
          <div className="locations-container">

            {/* Sede 1 */}
            <div className="location-item glass-panel">
              <div className="location-info">
                <h3>Sede Principal</h3>
                <p className="location-institutions">
                  EBR "Santa María de Guadalupe" (Primaria y Secundaria) · CEBA "San Martín de Porres"
                </p>
                <div className="location-address">
                  <MapPin size={17} aria-hidden="true" />
                  <span>Jirón Cajamarca 191, Callería — Pucallpa, Ucayali, Perú.</span>
                </div>
                <a
                  href="https://www.google.com/maps?q=-8.373596666404865,-74.54289978098608"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-maps-btn"
                >
                  <ExternalLink size={14} /> Abrir en Google Maps
                </a>
              </div>
              <div className="location-map-wrapper">
                <MapContainer center={MAP_POSITION} zoom={18} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={MAP_POSITION}>
                    <Popup><strong>Sede Principal</strong><br />Primaria, Secundaria y CEBA</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Sede 2 */}
            <div className="location-item glass-panel">
              <div className="location-info">
                <h3>Sede Inicial</h3>
                <p className="location-institutions">
                  EBR "Santa María de Guadalupe" — Grado Inicial
                </p>
                <div className="location-address">
                  <MapPin size={17} aria-hidden="true" />
                  <span>Jirón Cajamarca 148, Callería — Pucallpa, Ucayali, Perú.</span>
                </div>
                <a
                  href="https://www.google.com/maps?q=-8.37413686853864,-74.5431518177914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-maps-btn"
                >
                  <ExternalLink size={14} /> Abrir en Google Maps
                </a>
              </div>
              <div className="location-map-wrapper">
                <MapContainer center={MAP_POSITION_INICIAL} zoom={18} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={MAP_POSITION_INICIAL}>
                    <Popup><strong>EBR Santa María de Guadalupe</strong><br />Grado Inicial</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col footer-brand">
            <div className="footer-logo">Corporación Yeshua SRL</div>
            <p>
              Comprometidos con la excelencia educativa en Pucallpa, formando líderes
              con valores y calidad académica.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navegación</h4>
            <ul>
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}><a href={`#${id}`}>{label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contáctanos</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <Phone size={14} aria-hidden="true" />
                <a href="tel:+51974135754">+51 974 135 754</a>
              </div>
              <div className="footer-contact-item">
                <MapPin size={14} aria-hidden="true" />
                <span>Jr. Cajamarca 191, Callería, Pucallpa</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={14} aria-hidden="true" />
                <span>Jr. Cajamarca 148, Callería, Pucallpa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Corporación Yeshua SRL. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* ── WhatsApp Flotante ── */}
      <a
        href={WA_GENERAL}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contáctanos por WhatsApp"
      >
        <svg viewBox="0 0 448 512" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 100.3 32 0 132.3 0 256c0 39.5 10.3 78 30 112.6L0 480l114.6-30c33.3 18.2 70.8 27.8 109.3 27.8 123.6 0 223.9-100.3 223.9-224 0-59.4-23.2-115.3-65.1-117.2zM224 438c-33.3 0-66-8.9-94.4-25.7l-6.7-4-70.2 18.4 18.8-68.5-4.4-7.1C49.9 322.2 41 289.8 41 256 41 155.1 122.1 74 223.1 74c49 0 95 19.1 129.7 53.8C387.5 162.6 406.6 208.6 406.6 257c0 101-81.1 181-182.6 181zm113.4-154.3c-6.2-3.1-36.9-18.2-42.6-20.3-5.7-2.1-9.9-3.1-14 3.1-4.1 6.2-16 20.3-19.6 24.5-3.6 4.1-7.3 4.7-13.5 1.6-6.2-3.1-26.4-9.7-50.4-31.2-18.7-16.6-31.3-37.2-35-43.4-3.6-6.2-.4-9.6 2.8-12.7 2.8-2.8 6.2-7.3 9.4-10.9 3.1-3.6 4.1-6.2 6.2-10.4 2.1-4.1 1-7.8-.5-10.9-1.5-3.1-14-33.7-19.1-46.1-5.1-12.3-10.2-10.6-14-10.6-3.6 0-7.8-.5-12-.5-4.1 0-10.9 1.5-16.6 7.8-5.7 6.2-22.3 21.8-22.3 53.4 0 31.6 23 62.2 26.2 66.3 3.1 4.1 45.2 69 109.4 96.8 15.3 6.6 27.2 10.6 36.5 13.5 15.3 4.8 29.3 4.1 40.3 2.5 12.3-1.8 36.9-15.1 42.1-29.6 5.1-14.5 5.1-27 3.6-29.6-1.5-2.6-5.7-4.1-11.9-7.2z" />
        </svg>
      </a>

    </div>
  );
}

export default App;
