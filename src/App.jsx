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

const MAP_POSITION = [-8.373596666404865, -74.54289978098608]; // Pucallpa

function App() {
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
      {/* Hero Section */}
      <header className="hero">
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
      <section className="about-section">
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
      <section className="schools-section">
        <h2 ref={schoolsHeadingRef}>Nuestras Instituciones</h2>
        
        <div className="schools-grid">
          {/* Santa Maria Card */}
          <div 
            className="school-wrapper" 
            ref={(el) => (cardsRef.current[0] = el)}
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

              <h3>Colegio E.B.R<br/>"Santa María de Guadalupe"</h3>
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

          {/* San Martin Card */}
          <div 
            className="school-wrapper"
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <div className="school-card glass-panel">
              <div className="logo-container">
                <img src={logoSanMartin} alt="Logo de San Martín de Porres" className="school-logo" />
              </div>

              <div className="school-preview">
                 <img 
                   src="/san-martin-adults.png" 
                   alt="Adultos peruanos colaborando en la selva" 
                 />
              </div>

              <h3>Colegio E.B.A<br/>"San Martín de Porres"</h3>
              <p>
                <strong>Educación Básica Alternativa.</strong><br/><br/>
                Diseñado exclusivamente para jóvenes y adultos que desean iniciar, continuar o culminar sus estudios de forma rápida sin descuidar la vida laboral o personal. Nuestros docentes utilizan andragogía para asegurar la eficiencia del aprendizaje, combinando clases con herramientas digitales modernas que garantizan un resultado exitoso y certificación a nombre del Ministerio de Educación.
              </p>
              <ul className="school-highlights">
                <li>Ciclos intensivos para jóvenes y adultos</li>
                <li>Horarios flexibles (Fines de semana/Noche)</li>
                <li>Certificación oficial e inmediata</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
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
      <section className="location-section">
        <div ref={locationRef}>
          <h2>Ubicación</h2>
          <div className="location-content">
            <div className="location-text">
              <span className="location-icon">📍</span>
              <p>
                <strong>Sede Principal:</strong><br/>
                Jirón Cajamarca 191, Callería - Pucallpa, Ucayali, Perú.
              </p>
            </div>
            
            <div className="location-map">
              <MapContainer 
                center={MAP_POSITION} 
                zoom={15} 
                scrollWheelZoom={false} 
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={MAP_POSITION}>
                  <Popup>
                    <strong>Corporación Yeshua SRL</strong><br/>
                    Jirón Cajamarca 191, Pucallpa
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Corporación Yeshua SRL. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
