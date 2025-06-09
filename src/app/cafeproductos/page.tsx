"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import "./cafe.css";
import footerStyles from "../footer.module.css";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useCarrito } from "../components/usecarrito";
import { useMercadoPago } from "../components/useMercadopago";
import { strong } from "framer-motion/client";

interface Cafe {
  id?: string;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  precio: number;
  origen: string;
  intensidad: number;
  tipo: string;
  notas: string;
  tueste: string;
  kilos: number;
  estado: 'molido' | 'grano';
}

export default function Cafe() {
  const router = useRouter();
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const { carrito, agregarAlCarrito, eliminarDelCarrito, mostrarCarrito, toggleCarrito, total } = useCarrito();
  const { cargandoPago, handlePagar } = useMercadoPago();

  useEffect(() => {
    const obtenerCafes = async () => {
      const querySnapshot = await getDocs(collection(db, "cafes"));
      const lista: Cafe[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lista.push({
          id: doc.id,
          nombre: data.nombre,
          descripcion: data.descripcion,
          imagenUrl: data.imagenUrl || "/images/default.jpg",
          precio: data.precio,
          origen: data.origen,
          intensidad: data.intensidad,
          tipo: data.tipo,
          notas: data.notas,
          tueste: data.tueste,
          kilos: data.kilos,
          estado: data.estado
        });
      });

      setCafes(lista);
    };

    obtenerCafes();
  }, []);

 const cafesFiltrados = cafes.filter(
  (cafe) => {
    const searchTerm = busqueda.toLowerCase();
    return (
      (cafe.nombre?.toLowerCase() || '').includes(searchTerm) ||
      (cafe.descripcion?.toLowerCase() || '').includes(searchTerm) ||
      (cafe.origen?.toLowerCase() || '').includes(searchTerm) ||
      (cafe.tipo?.toLowerCase() || '').includes(searchTerm) ||
      (cafe.tueste?.toLowerCase() || '').includes(searchTerm) ||
      (cafe.notas?.toLowerCase() || '').includes(searchTerm)
    );
  }
);
  const esImagenExterna = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const irACheckout = () => {
    router.push('/checkout');
  };

  return (
    <main className="cafe-page">
      <nav className="navbar">
        <div className="navbar-brand-container">
          <a href="/" className="nav-link logo-text">Cafetería</a>
        </div>

        <div className="navbar-links-container">
          <a href="/cafe" className="nav-link">Inicio</a>
          <a href="/cafeproductos" className="nav-link">Productos</a>
          <a href="/" className="nav-link">Panadería</a>
          <a href="#testimonios" className="nav-link">Testimonios</a>

          <Image
            src="/images/logo-cafe.png"
            alt="Logo de la Cafetería"
            width={50}
            height={50}
            className="navbar-logo-image"
          />
        </div>
      </nav>

      <section className="productos-hero">
        <h1>Nuestros Cafés</h1>
        <p>Explora nuestra deliciosa selección de cafés artesanales</p>
        <input
          type="text"
          placeholder="Buscar café..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador-productos"
        />
      </section>

      <section className="categoria-cafe">
        <h2 className="titulo-categoria">Café</h2>
        <div className="cafe-grid">
          {cafesFiltrados.length > 0 ? (
            cafesFiltrados.map((cafe) => (
              <div key={cafe.id} className="cafe-card">
                <div className="cafe-imagen-container">
                  {esImagenExterna(cafe.imagenUrl) ? (
                    <img
                      src={cafe.imagenUrl}
                      alt={cafe.nombre}
                      className="cafe-imagen"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Image
                      src={cafe.imagenUrl}
                      alt={cafe.nombre}
                      fill
                      className="cafe-imagen"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  )}
                </div>
                <div className="cafe-card-content">
                  <h3>{cafe.nombre}</h3>
                  <p className="descripcion">{cafe.descripcion}</p>
                  <div className="cafe-details">
                    <p><strong>Origen:</strong> {cafe.origen}</p>
                    <p><strong>Tipo:</strong> {cafe.tipo}</p>
                    <p><strong>Intensidad:</strong> {cafe.intensidad}/10</p>
                    <p><strong>Tueste:</strong> {cafe.tueste}</p>
                    <p><strong>Kilos:</strong> {cafe.kilos} kg</p>
                    <p><strong>Estado:</strong> {cafe.estado === 'grano' ? 'En Grano' : 'Molido'}</p>
                    {cafe.notas && <p><strong>Notas:</strong> {cafe.notas}</p>}
                  </div>
                  <p className="precio">${cafe.precio} MXN</p>
                  <button
                    className="btn-pedir"
                    onClick={() => agregarAlCarrito({
                      nombre: cafe.nombre,
                      descripcion: cafe.descripcion,
                      imagen: cafe.imagenUrl,
                      precio: cafe.precio,
                      categoria: "Café"
                    })}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-resultados">No se encontraron cafés que coincidan con tu búsqueda.</p>
          )}
        </div>
      </section>

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
                      <button className="btn-eliminar" onClick={() => eliminarDelCarrito(nombre)}>
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="carrito-total">
                  <strong>Total: </strong>${total} MXN
                </div>
                <button
                  className="btn-pagar"
                  onClick={irACheckout}
                  disabled={carrito.length === 0}
                >
                  Proceder al pago
                </button>
              </>
            )}
            <button className="btn-cerrar" onClick={toggleCarrito}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <footer className={footerStyles.footer}>
        {/* Aquí tu footer */}
      </footer>
    </main>
  );
}