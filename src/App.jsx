import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';
import logoSantaMaria from './assets/logos/logo-santa-maria.png';
import logoSanMartin from './assets/logos/logo-san-martin.png';

// Fix Leaflet marker icons not showing in Vite
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

gsap.registerPlugin(ScrollTrigger);

const MAP_POSITION = [-8.373596666404865, -74.54289978098608]; // Pucallpa Main
const MAP_POSITION_INICIAL = [-8.37413686853864, -74.5431518177914]; // Grado Inicial

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const schoolsHeadingRef = useRef(null);
  const cardsRef = useRef([]);
  const featuresRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; 

    let ctx = gsap.context(() => {
      // 1. Hero
      gsap.from(heroRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1
      });

      // 2. About section
      gsap.from(aboutRef.current.children, {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // 3. Schools Heading
      gsap.from(schoolsHeadingRef.current, {
        scrollTrigger: {
          trigger: ".schools-section",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // 4. School Cards 
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: ".schools-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });

      // 5. Features
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });

      // 6. Location
      gsap.from(locationRef.current, {
        scrollTrigger: {
          trigger: ".location-section",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="app-container">
      {/* Navigation Navbar */}
      <nav className="navbar glass-panel">
        <div className="nav-container">
          <div className="nav-logo">Corporación Yeshua</div>
          
          <button 
            className={`nav-toggle ${isMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#inicio" onClick={() => setIsMenuOpen(false)}>Inicio</a></li>
            <li><a href="#nosotros" onClick={() => setIsMenuOpen(false)}>Nosotros</a></li>
            <li><a href="#instituciones" onClick={() => setIsMenuOpen(false)}>Instituciones</a></li>
            <li><a href="#beneficios" onClick={() => setIsMenuOpen(false)}>Beneficios</a></li>
            <li><a href="#ubicacion" onClick={() => setIsMenuOpen(false)}>Ubicación</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="inicio" className="hero">
        <div ref={heroRef} style={{ position: 'relative', zIndex: 2 }}>
          <h1>Corporación Yeshua SRL</h1>
          <p>
            Comprometidos con la excelencia educativa. Representamos instituciones 
            de prestigio en Pucallpa, Perú, formando a los líderes del mañana con 
            valores y calidad académica.
          </p>
        </div>
      </header>

      {/* About Section */}
      <section id="nosotros" className="about-section">
        <div className="about-content" ref={aboutRef}>
          <div className="about-text">
            <h2>Nuestra Misión y Visión</h2>
            <p>
              En la <strong>Corporación Yeshua SRL</strong> creemos firmemente que la educación es la base
              fundamental para transformar a la sociedad. Es por eso que agrupamos instituciones enfocadas en 
              diferentes niveles y modalidades para llegar a todos los peruanos con necesidad de superación.
            </p>
            <p>
              Inculcamos los valores más altos de respeto, fe y equidad, con el objetivo de formar hombres y mujeres que impacten positivamente sus comunidades en la región de Pucallpa y todo el país.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
              alt="Estudiantes compartiendo en el campus" 
            />
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section id="instituciones" className="schools-section">
        <h2 ref={schoolsHeadingRef}>Nuestras Instituciones</h2>
        
        <div className="schools-scroll-viewport">
          <div className="scroll-hint-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <div className="schools-grid" ref={scrollContainerRef}>
          {/* School 1: Santa Maria Inicial */}
          <div className="school-wrapper" ref={(el) => (cardsRef.current[0] = el)}>
            <div className="school-card glass-panel">
              <div className="logo-container">
                <img src={logoSantaMaria} alt="Logo Santa María" className="school-logo" />
              </div>
              <div className="school-preview">
                <img 
                  src="/santa-maria-inicial.jpg" 
                  alt="Estudiantes del Colegio Santa María de Guadalupe Inicial" 
                />
              </div>

              <h3>Colegio E.B.R<br/>"Santa María de Guadalupe"<br/><span style={{fontSize: "1rem", color: "var(--secondary-color)"}}>- GRADO INICIAL</span></h3>
              <p>
                <strong>Educación Básica Regular (Inicial).</strong><br/><br/>
                Brindamos un ambiente cálido, seguro y estimulante para los más pequeños. Promovemos fuertemente los valores cristianos y católicos. Nuestro modelo educativo mediante el juego y la exploración asegura un desarrollo psicomotriz, cognitivo y socioemocional óptimo en sus primeros años de aprendizaje.
              </p>
              <ul className="school-highlights">
                <li>Educación Inicial especializada.</li>
                <li>Docentes calificados para primera infancia.</li>
                <li>Valores cristianos católicos.</li>
              </ul>
            </div>
          </div>

          {/* School 2: Santa Maria Primaria y Secundaria */}
          <div 
            className="school-wrapper" 
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <div className="school-card glass-panel">
              <div className="logo-container">
                <img src={logoSantaMaria} alt="Logo de Santa María de Guadalupe" className="school-logo" />
              </div>
              
              <div className="school-preview">
                <img 
                  src="/santa-maria-real.jpg" 
                  alt="Estudiantes del Colegio Santa María de Guadalupe" 
                />
              </div>

              <h3>Colegio E.B.R<br/>"Santa María de Guadalupe"<br/><span style={{fontSize: "1rem", color: "var(--secondary-color)"}}>- GRADO PRIMARIA Y SECUNDARIA</span></h3>
              <p>
                <strong>Educación Básica Regular.</strong><br/><br/>
                Formamos a niños y adolescentes a través de metodologías innovadoras. Promovemos fuertemente los valores cristianos y católicos. Nuestro modelo educativo asegura que los alumnos de nivel primario y secundario obtengan bases académicas altamente competitivas, junto a un sólido desarrollo socioemocional apoyado por tutores y personal psicológico dedicado.
              </p>
              <ul className="school-highlights">
                <li>Educación Inicial, Primaria y Secundaria.</li>
                <li>Docentes calificados.</li>
                <li>Valores cristianos católicos.</li>
              </ul>
            </div>
          </div>

          {/* School 3: San Martin */}
          <div 
            className="school-wrapper" 
            ref={(el) => (cardsRef.current[2] = el)}
          >
            <div className="school-card glass-panel">
              <div className="logo-container">
                <img src={logoSanMartin} alt="Logo de San Martín de Porres" className="school-logo" />
              </div>

              <div className="school-preview">
                 <img 
                   src="/san-martin-real.jpg" 
                   alt="Estudiantes del Colegio San Martín de Porres" 
                 />
              </div>

              <h3>Colegio E.B.A<br/>"San Martín de Porres"</h3>
              <p>
                <strong>Educación Básica Alternativa.</strong><br/><br/>
                Diseñado exclusivamente para jóvenes y adultos que desean iniciar, continuar o culminar sus estudios de forma rápida sin descuidar la vida laboral o personal. Nuestros docentes utilizan andragogía para asegurar la eficiencia del aprendizaje, combinando clases con herramientas digitales modernas que garantizan un resultado exitoso y certificación a nombre del Ministerio de Educación.
              </p>
              <ul className="school-highlights">
                <li>Termina la secundaria en corto tiempo.</li>
                <li>Horarios sábados y domingos en virtual, presencial o a distancia.</li>
                <li>Certificado oficial válido por el Ministerio de Educación - MINEDU.</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="beneficios" className="features-section">
        <h2>¿Por qué elegirnos?</h2>
        <div className="features-grid">
          <div className="feature-item glass-panel">
            <span className="feature-icon">🎓</span>
            <h3>Excelencia Académica</h3>
            <p>Contamos con una plana docente capacitada, activa y en constante innovación metodológica.</p>
          </div>
          <div className="feature-item glass-panel">
            <span className="feature-icon">💡</span>
            <h3>Entorno Moderno</h3>
            <p>Infraestructura adecuada para un aprendizaje efectivo, cómodo y seguro.</p>
          </div>
          <div className="feature-item glass-panel">
            <span className="feature-icon">🤝</span>
            <h3>Acompañamiento</h3>
            <p>Soporte personalizado enfocado tanto en lo académico como en la salud emocional.</p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="ubicacion" className="location-section">
        <div ref={locationRef}>
          <h2>Nuestras Ubicaciones</h2>
          <div className="locations-container">
            {/* Location 1 */}
            <div className="location-item glass-panel">
              <div className="location-info">
                <h3><span className="location-symbol">📍</span> Dirección del CEBA "San Martin de Porres" y EBR "Santa María de Guadalupe" Grado Primaria y Secundaria:</h3>
                <p>
                  Jirón Cajamarca 191, Callería - Pucallpa, Ucayali, Perú.
                </p>
              </div>
              <div className="location-map-wrapper">
                <MapContainer 
                  center={MAP_POSITION} 
                  zoom={18} 
                  scrollWheelZoom={false} 
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={MAP_POSITION}>
                    <Popup>
                      <strong>Sede Principal</strong><br/>
                      Primaria, Secundaria y CEBA
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Location 2 */}
            <div className="location-item glass-panel">
              <div className="location-info">
                <h3><span className="location-symbol">📍</span> Dirección EBR "Santa María de Guadalupe" Grado Inicial:</h3>
                <p>
                  Jirón Cajamarca 148, Callería - Pucallpa, Ucayali, Perú.
                </p>
              </div>
              <div className="location-map-wrapper">
                <MapContainer 
                  center={MAP_POSITION_INICIAL} 
                  zoom={18} 
                  scrollWheelZoom={false} 
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={MAP_POSITION_INICIAL}>
                    <Popup>
                      <strong>EBR Santa María de Guadalupe</strong><br/>
                      Grado Inicial
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Corporación Yeshua SRL. Todos los derechos reservados.</p>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://api.whatsapp.com/send/?phone=%2B51974135754&text&type=phone_number&app_absent=0" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        aria-label="Contact on WhatsApp"
      >
        <svg viewBox="0 0 448 512" width="24" height="24" fill="currentColor">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 100.3 32 0 132.3 0 256c0 39.5 10.3 78 30 112.6L0 480l114.6-30c33.3 18.2 70.8 27.8 109.3 27.8 123.6 0 223.9-100.3 223.9-224 0-59.4-23.2-115.3-65.1-117.2zM224 438c-33.3 0-66-8.9-94.4-25.7l-6.7-4-70.2 18.4 18.8-68.5-4.4-7.1C49.9 322.2 41 289.8 41 256 41 155.1 122.1 74 223.1 74c49 0 95 19.1 129.7 53.8C387.5 162.6 406.6 208.6 406.6 257c0 101-81.1 181-182.6 181zm113.4-154.3c-6.2-3.1-36.9-18.2-42.6-20.3-5.7-2.1-9.9-3.1-14 3.1-4.1 6.2-16 20.3-19.6 24.5-3.6 4.1-7.3 4.7-13.5 1.6-6.2-3.1-26.4-9.7-50.4-31.2-18.7-16.6-31.3-37.2-35-43.4-3.6-6.2-.4-9.6 2.8-12.7 2.8-2.8 6.2-7.3 9.4-10.9 3.1-3.6 4.1-6.2 6.2-10.4 2.1-4.1 1-7.8-.5-10.9-1.5-3.1-14-33.7-19.1-46.1-5.1-12.3-10.2-10.6-14-10.6-3.6 0-7.8-.5-12-.5-4.1 0-10.9 1.5-16.6 7.8-5.7 6.2-22.3 21.8-22.3 53.4 0 31.6 23 62.2 26.2 66.3 3.1 4.1 45.2 69 109.4 96.8 15.3 6.6 27.2 10.6 36.5 13.5 15.3 4.8 29.3 4.1 40.3 2.5 12.3-1.8 36.9-15.1 42.1-29.6 5.1-14.5 5.1-27 3.6-29.6-1.5-2.6-5.7-4.1-11.9-7.2z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;
