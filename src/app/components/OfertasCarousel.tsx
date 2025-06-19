import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Fade, Zoom } from 'react-awesome-reveal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Oferta {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
}

const OfertasCarousel = () => {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const cargarOfertas = async () => {
      try {
        const ofertasRef = collection(db, 'ofertas');
        const ofertasSnap = await getDocs(ofertasRef);
        const ofertasData = ofertasSnap.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Oferta))
          .filter(oferta => {
            const ahora = new Date();
            const inicio = new Date(oferta.fechaInicio);
            const fin = new Date(oferta.fechaFin);
            return oferta.activa && ahora >= inicio && ahora <= fin;
          });
        
        setOfertas(ofertasData);
      } catch (error) {
        console.error('Error al cargar las ofertas:', error);
      }
    };

    cargarOfertas();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ],
    customPaging: (i: number) => (
      <div
        style={{
          width: '30px',
          height: '4px',
          background: i === currentSlide ? '#fff' : 'rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          transform: i === currentSlide ? 'scaleX(1.2)' : 'scaleX(1)'
        }}
      />
    )
  };

  if (ofertas.length === 0) return null;

  return (
    <motion.section 
      className="ofertas-carousel-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="ofertas-carousel">
        <Slider {...settings}>
          {ofertas.map((oferta, index) => (
            <div key={oferta.id} className="oferta-slide">
              <motion.div 
                className="oferta-content"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {oferta.imagen && (
                  <div className="oferta-imagen-container">
                    <Image
                      src={oferta.imagen}
                      alt={oferta.titulo}
                      width={600}
                      height={600}
                      style={{ 
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                      priority
                    />
                    <div className="oferta-overlay" />
                  </div>
                )}
                <AnimatePresence mode="wait">
                  {currentSlide === index && (
                    <motion.div 
                      className="oferta-info"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="oferta-info-content">
                        <Zoom cascade damping={0.1} triggerOnce>
                          <h3>{oferta.titulo}</h3>
                        </Zoom>
                        <Fade cascade damping={0.1} triggerOnce>
                          <p>{oferta.descripcion}</p>
                          <div className="oferta-badge">
                            <span className="oferta-fecha">
                              Válido del {new Date(oferta.fechaInicio).toLocaleDateString()} 
                              al {new Date(oferta.fechaFin).toLocaleDateString()}
                            </span>
                          </div>
                        </Fade>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.section>
  );
};

export default OfertasCarousel; 