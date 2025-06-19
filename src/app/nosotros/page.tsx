"use client";

import Image from "next/image";
import Link from "next/link";
import "./styles.css";
// If your footer has specific styles imported like this, keep it
// import footerStyles from "./footer.module.css"; // Uncomment if you use a CSS Modules file for the footer

// Import the hooks
import { useCarrito } from "../components/usecarrito"
 // Adjust the path if necessary
import { useMercadoPago } from "../components/useMercadopago"; // Adjust the path if necessary

export default function NosotrosPage() {
  // Use the useCarrito hook to get cart state and toggle function
  const { carrito, toggleCarrito, mostrarCarrito, total } = useCarrito();

  // Use the useMercadoPago hook to get loading state and payment function
  const { cargandoPago, handlePagar } = useMercadoPago(); // <--- NEW

  // Calculate the total number of items in the cart for the notification
  const totalItemsEnCarrito = carrito.reduce((sum, p) => sum + p.cantidad, 0);

  // Function to handle the payment, using the Mercado Pago hook
  const iniciarPago = () => { // <--- NEW
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    // Prepare items for Mercado Pago
    const itemsMP = carrito.map(({ nombre, cantidad, precio }) => ({
      title: nombre,
      quantity: cantidad,
      unit_price: precio,
    }));
    handlePagar(itemsMP, {
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      codigoPostal: "",
      ciudad: "",
      estado: ""
    }); // Pass an empty object or the required shipping data as the second argument
  };

  return (
    <main>
      <header className="header">
        <div className="logo-link-header">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="logo-img"
          />
          <h1 className="logo">Panadería El Pan de Cada Día</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/productos">Productos</Link></li>
            <li><Link href="/cafe">Cafe</Link></li>
            <li><Link href="/nosotros" className="active">Nosotros</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li>
              <button onClick={toggleCarrito} className="btn-carrito-toggle">
                <span className="icono-carrito">🛒</span>
                <span>Carrito</span>
                {totalItemsEnCarrito > 0 && (
                  <span className="notificacion-carrito">
                    {totalItemsEnCarrito}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <section className="nosotros-hero">
        <div className="nosotros-hero-content">
          <h1>Nuestra Historia, Tu Confianza</h1>
          <p>Más de 30 años horneando tradición y calidad</p>
        </div>
      </section>

      <section className="historia-section">
        <div className="historia-container">
          <div className="historia-texto">
            <h2>Desde 1990 endulzando tu vida</h2>
            <p>
              Fundada por la familia Martínez en el corazón de Tehuacán, nuestra panadería nació
              del sueño de compartir los sabores auténticos de la panadería tradicional mexicana.
              Lo que comenzó como un pequeño local con un horno de leña, hoy es un referente
              gastronómico en la región.
            </p>
            <p>
              Cada mañana, nuestros maestros panaderos inician su jornada antes del amanecer,
              siguiendo al pie de la letra las recetas que han pasado de generación en generación,
              combinándolas con técnicas modernas que garantizan la máxima calidad.
            </p>
            <div className="datos-destacados">
              <div className="dato-item">
                <span className="dato-numero">30+</span>
                <span className="dato-texto">Años de experiencia</span>
              </div>
              <div className="dato-item">
                <span className="dato-numero">50+</span>
                <span className="dato-texto">Variedades de pan</span>
              </div>
              <div className="dato-item">
                <span className="dato-numero">10,000+</span>
                <span className="dato-texto">Clientes satisfechos</span>
              </div>
            </div>
          </div>
          <div className="historia-imagen">
            <Image
              src="/images/pan-wl.jpeg"
              alt="Nuestra panadería en los años 90"
              width={600}
              height={400}
              className="historia-img"
            />
          </div>
        </div>
      </section>

      <section className="equipo-section">
        <div className="equipo-header">
          <h2>Conoce a Nuestro Equipo</h2>
          <p>Los artesanos detrás de cada delicia</p>
        </div>
        <div className="equipo-grid">
          <div className="miembro-equipo">
            <div className="miembro-imagen">
              <Image
                src="/images/maestro panadero.avif"
                alt="Maestro panadero"
                width={300}
                height={300}
              />
              <div className="miembro-info">
                <h3>Don Javier Martínez</h3>
                <p>Fundador y Maestro Panadero</p>
                <p className="miembro-desc">&ldquo;La paciencia y el amor son los ingredientes secretos&rdquo;</p>
              </div>
            </div>
          </div>
          <div className="miembro-equipo">
            <div className="miembro-imagen">
              <Image
                src="/images/repostera.avif"
                alt="Repostera"
                width={300}
                height={300}
              />
              <div className="miembro-info">
                <h3>Ana López</h3>
                <p>Jefa de Repostería</p>
                <p className="miembro-desc">&ldquo;Cada postre cuenta una historia dulce&rdquo;</p>
              </div>
            </div>
          </div>
          <div className="miembro-equipo">
            <div className="miembro-imagen">
              <Image
                src="/images/clientes.jpeg"
                alt="Atención a clientes"
                width={300}
                height={300}
              />
              <div className="miembro-info">
                <h3>Carlos Ramírez</h3>
                <p>Atención al Cliente</p>
                <p className="miembro-desc">&ldquo;Me encanta recomendar el pan perfecto para cada persona&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="valores-section">
        <div className="valores-container">
          <h2>Nuestros Valores</h2>
          <div className="valores-grid">
            <div className="valor-card">
              <div className="valor-icono">🍞</div>
              <h3>Tradición</h3>
              <p>Respetamos y mantenemos vivas las recetas y técnicas tradicionales</p>
            </div>
            <div className="valor-card">
              <div className="valor-icono">🌾</div>
              <h3>Calidad</h3>
              <p>Usamos solo ingredientes naturales y de la mejor procedencia</p>
            </div>
            <div className="valor-card">
              <div className="valor-icono">❤️</div>
              <h3>Pasión</h3>
              <p>Amamos lo que hacemos y eso se nota en cada producto</p>
            </div>
            <div className="valor-card">
              <div className="valor-icono">🤝</div>
              <h3>Comunidad</h3>
              <p>Somos parte fundamental del tejido social de Tehuacán</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonios-section">
        <div className="testimonios-container">
          <h2>Lo que dicen nuestros clientes</h2>
          <div className="testimonios-grid">
            <div className="testimonio-card">
              <div className="testimonio-texto">
                &ldquo;El mejor pan de muerto que he probado en mi vida. Sabe exactamente como el que hacía mi abuela&rdquo;
              </div>
              <div className="testimonio-autor">
                <Image
                  src="/images/cliente1.jpg"
                  alt="Cliente María"
                  width={60}
                  height={60}
                  className="testimonio-foto"
                />
                <div>
                  <p className="testimonio-nombre">María González</p>
                  <p className="testimonio-desc">Clienta desde 2005</p>
                </div>
              </div>
            </div>
            <div className="testimonio-card">
              <div className="testimonio-texto">
                &ldquo;No hay mejor manera de empezar el día que con un café y una concha recién horneada&rdquo;
              </div>
              <div className="testimonio-autor">
                <Image
                  src="/images/cliente2.jpg"
                  alt="Cliente Roberto"
                  width={60}
                  height={60}
                  className="testimonio-foto"
                />
                <div>
                  <p className="testimonio-nombre">Roberto Torres</p>
                  <p className="testimonio-desc">Cliente frecuente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     <section className="visitanos-section">
  <div className="visitanos-container">
    <div className="visitanos-info">
      <h2>Visítanos</h2>
      <p>Estamos en el corazón de Tehuacán</p>
      <div className="visitanos-datos">
        <p>📍 Calle del Sabor 123, Col. La Hogaza, Tehuacán, Puebla</p>
        <p>🕒 Horario: Lunes a Sábado 6:00 am - 9:00 pm</p>
        <p>📞 Teléfono: 238 123 4567</p>
        <p>📧 Email: contacto@elpandecadadia.com</p>
      </div>
      {/*
        El botón ahora abrirá la misma dirección de Google Maps.
      */}
      <a
        href="https://maps.app.goo.gl/oHYyx4NLNiQiBNdQA" 
        target="_blank"
        rel="noopener noreferrer"
        className="btn-mapa"
      >
        Ver en mapa
      </a>
    </div>
    <div className="visitanos-imagen">
      {/* El iframe ya tiene la URL actualizada */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.4383601596455!2d-97.37770572534913!3d18.463792770907173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c5bdb557c4b3d9%3A0xd3391c3e9cc7b23b!2sNINDO%20CAF%C3%89!5e0!3m2!1ses!2smx!4v1748828396037!5m2!1ses!2smx"
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="local-img"
        title="Ubicación de nuestra panadería en Google Maps"
      ></iframe>
    </div>
  </div>
</section>


      {/* Overlay del Carrito */}
      {mostrarCarrito && (
        <div className="carrito-overlay" onClick={toggleCarrito}>
          <div className="carrito" onClick={(e) => e.stopPropagation()}>
            <h2>Tu Carrito</h2>
            {carrito.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <>
                <ul>
                  {carrito.map(({ nombre, precio, cantidad }) => (
                    <li key={nombre} className="carrito-item">
                      <span>{nombre} x {cantidad}</span>
                      <span>${precio * cantidad} MXN</span>
                      {/* No incluimos botón de eliminar aquí, para que la gestión sea en Productos */}
                    </li>
                  ))}
                </ul>
                <div className="carrito-total">
                  <strong>Total: </strong>${total} MXN
                </div>
                {/* Botón de Pagar usando la función iniciarPago */}
                <button
                  className="btn-pagar"
                  onClick={iniciarPago} // <--- NEW: Calls the payment function
                  disabled={cargandoPago || carrito.length === 0} // Disable if loading or cart is empty
                >
                  {cargandoPago ? "Redirigiendo a pago..." : "Pagar con Mercado Pago"}
                </button>
                {/* Opcionalmente, un enlace a productos para editar el carrito */}
                <Link href="/productos" className="btn-editar-carrito">
                   Editar Carrito
                </Link>
              </>
            )}
            <button className="btn-cerrar" onClick={toggleCarrito}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section logo">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="footer-logo"
            />
          </div>
          <div className="footer-section">
            <h3>Navegación</h3>
            <ul>
              <li><Link href="/nosotros">Nosotros</Link></li>
              <li><Link href="/productos">Productos</Link></li>
              <li><Link href="#">Contacto</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Síguenos</h3>
            <ul>
              <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
              <li><a href="https://wa.me/522380000000" target="_blank">WhatsApp</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contáctanos</h3>
            <p>Calle del Sabor 123, Col. La Hogaza</p>
            <p>75700 Tehuacán, Pue.</p>
            <p>Tel: +52 238 123 4567</p>
            <p>pedidos@elpandecadadia.com</p>
          </div>
        </div>
      </footer>
    </main>
  );
}