import './cafe.css'; // Asegúrate de que tu CSS esté importado
import Image from 'next/image';
import Link from 'next/link';

export default function CafePage() {
  return (
    <> 
      <main className="cafe-page">
        <section className="hero">
          {/* Navbar ajustado para el diseño de la imagen */}
          <nav className="navbar">
            {/* Contenedor para el logo y el nombre de la cafetería (parte izquierda de la navbar) */}
            <div className="navbar-brand-container"> {/* NUEVO CONTENEDOR */}
              
              <Link href="/" className="nav-link logo-text">Cafetería</Link> {/* El texto del nombre de la cafetería */}
            </div>

            {/* Links de navegación y (opcionalmente) el icono de búsqueda (parte derecha de la navbar) */}
            <div className="navbar-links-container"> {/* Renombrado para claridad */}
              <Link href="/cafe" className="nav-link">Inicio</Link> {/* Corregí el enlace a "Inicio" */}
              <Link href="/cafeproductos" className="nav-link">Productos</Link>
              <Link href="/" className="nav-link">Panadería</Link> {/* Asumo que tienes una página /panaderia */}
              <Link href="#testimonios" className="nav-link">Testimonios</Link>

              <Image
                src="/images/logo-cafe.png" // <--- RUTA DE TU LOGO DE CAFETERÍA
                alt="Logo de la Cafetería"
                width={50} // <--- AJUSTA EL TAMAÑO DE TU LOGO AQUÍ
                height={50} // <--- AJUSTA EL TAMAÑO DE TU LOGO AQUÍ
                className="navbar-logo-image" // NUEVA CLASE para estilizar la imagen del logo
              />
              
              {/* Opcional: Si quieres un icono de búsqueda a la derecha, mantén esto.
                  Si no, simplemente quítalo. */}
              
              
            </div>
            {/* Para móviles, podrías añadir un botón de hamburguesa aquí y manejarlo con JS */}
          </nav>

          <div className="hero-text">
            <h1>El Arte del Café</h1>
            <p>Una experiencia sensorial en cada taza.</p>
            <button className="cta-button">Comprar Ahora</button>
          </div>
        </section>

        {/* Sección de enlaces de menú inferior */}
        <section className="info-nav-links">
          <Link href="#menu" className="info-nav-link">El Menú</Link>
          <Link href="#info-cafeteria" className="info-nav-link">Información La Cafetería</Link>
          <Link href="#ubicacion" className="info-nav-link">Ubicación</Link>
          <Link href="#contacto" className="info-nav-link">Contacto</Link>
        </section>

        <section id="productos" className="productos">
          <h2 className="productos-titulo">Nuestros Favoritos</h2>
          <div className="productos-grid">
            <div className="producto-card">
              <div className="producto-etiqueta natural">ESPRESSO</div>
              <Image src="/images/cafe.png" alt="Espresso" width={180} height={180} className="producto-img" />
              <div className="producto-info">
                <div className="producto-rating">★★★★★ <span>(12)</span></div>
                <h3 className="producto-nombre">Espresso</h3>
                <p className="producto-precio">Desde $75.00 MXN</p>
                <p className="producto-notas">NOTAS: CHOCOLATE / NUEZ / TOQUE FLORAL</p>
                <p className="producto-tueste">Tueste Medio</p>
              </div>
            </div>

            <div className="producto-card">
              <div className="producto-etiqueta honey">AMERICANO</div>
              <Image src="/images/cafe.png" alt="Americano" width={180} height={180} className="producto-img" />
              <div className="producto-info">
                <div className="producto-rating">★★★★☆ <span>(9)</span></div>
                <h3 className="producto-nombre">Americano</h3>
                <p className="producto-precio">Desde $60.00 MXN</p>
                <p className="producto-notas">NOTAS: CARAMELO / NUEZ / FINAL LIMPIO</p>
                <p className="producto-tueste">Tueste Medio</p>
              </div>
            </div>

            <div className="producto-card">
              <div className="producto-etiqueta lavado">CAPPUCCINO</div>
              <Image src="/images/cafe.png" alt="Cappuccino" width={180} height={180} className="producto-img" />
              <div className="producto-info">
                <div className="producto-rating">★★★★★ <span>(17)</span></div>
                <h3 className="producto-nombre">Cappuccino</h3>
                <p className="producto-precio">Desde $85.00 MXN</p>
                <p className="producto-notas">NOTAS: CREMOSO / VAINILLA / CACAO</p>
                <p className="producto-tueste">Tueste Medio</p>
              </div>
            </div>
             <div className="producto-card">
              <div className="producto-etiqueta lavado">LATTE</div>
              <Image src="/images/cafe.png" alt="Latte" width={180} height={180} className="producto-img" />
              <div className="producto-info">
                <div className="producto-rating">★★★★★ <span>(15)</span></div>
                <h3 className="producto-nombre">Latte</h3>
                <p className="producto-precio">Desde $80.00 MXN</p>
                <p className="producto-notas">NOTAS: SUAVE / LECHE / DULCE</p>
                <p className="producto-tueste">Tueste Ligero</p>
              </div>
            </div>
          </div>
        </section>

        <section id="informacion" className="informacion fade-in-up">
          <h2>Información del Café</h2>
          <div className="info-cards-container">
            <article className="info-card left-image">
              <div className="info-image">
                <Image src="/images/origen-del cafe.jpeg" alt="Origen del café" width={500} height={300}/>
              </div>
              <div className="info-text">
                <h3>Origen</h3>
                <p>
                  Nuestro café proviene de las montañas de Oaxaca, México, cultivado en
                  altitudes ideales para un sabor intenso y aroma único.
                </p>
              </div>
            </article>

            <article className="info-card right-image">
              <div className="info-text">
                <h3>Proceso de Tostado</h3>
                <p>
                  Tostamos nuestros granos de forma artesanal para preservar los
                  matices y la calidad, con perfiles que varían desde ligero hasta
                  oscuro.
                </p>
              </div>
              <div className="info-image">
                <Image src="/images/tostado.jpeg" alt="Proceso de tostado" width={500} height={300} />
              </div>
            </article>

            <article className="info-card left-image">
              <div className="info-image">
                <Image src="/images/variedades-cafe.jpg" alt="Variedades de café" width={500} height={300} />
              </div>
              <div className="info-text">
                <h3>Variedades</h3>
                <p>
                  Contamos con variedades arábica y robusta, cada una con características
                  especiales que satisfacen todos los gustos.
                </p>
              </div>
            </article>

            <article className="info-card right-image">
              <div className="info-text">
                <h3>Perfil de Sabor</h3>
                <p>
                  Nuestros cafés ofrecen notas florales, frutales y un cuerpo balanceado,
                  ideal para amantes del café exigentes.
                </p>
              </div>
              <div className="info-image">
                <Image src="/images/sabor cafe.jpeg" alt="Perfil de sabor" width={500} height={300} />
              </div>
            </article>
          </div>
        </section>

        <section id="testimonios" className="testimonios fade-in">
          <h2>Lo que dicen nuestros clientes</h2>
          <blockquote>“El mejor café que he probado. Su aroma es una delicia.”</blockquote>
        </section>
      </main>
    </>
  );
}