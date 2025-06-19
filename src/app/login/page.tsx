'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebaseConfig';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Solo para registro
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Aquí puedes agregar el username a tu base de datos si es necesario
      router.push('/');
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message);
      console.error('Error al registrar:', error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/paneldecontrol');
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message);
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className={`${styles.container} ${rightPanelActive ? styles.rightPanelActive : ''}`}>
      {/* Mostrar errores */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Sign Up Form */}
      <div className={`${styles.container__form} ${styles.containerSignup}`}>
        <form onSubmit={handleSignUp} className={styles.form}>
          <h2 className={styles.form__title}>Crear Cuenta</h2>
          <input 
            type="text" 
            placeholder="Usuario" 
            className={styles.input} 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            className={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className={styles.input} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className={styles.btn}>Registrarse</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className={`${styles.container__form} ${styles.containerSignin}`}>
        <form onSubmit={handleSignIn} className={styles.form}>
          <h2 className={styles.form__title}>Iniciar Sesión</h2>
          <input 
            type="email" 
            placeholder="Email" 
            className={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className={styles.input} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <a href="/recuperar-contrasena" className={styles.link}>¿Olvidaste tu contraseña?</a>
          <button type="submit" className={styles.btn}>Ingresar</button>
        </form>
      </div>

      {/* Overlay */}
      <div className={styles.container__overlay}>
        <div className={styles.overlay}>
          <div className={`${styles.overlay__panel} ${styles.overlayLeft}`}>
            <h2>¡Bienvenido de vuelta!</h2>
            <p>Ingresa tus datos para acceder a tu cuenta</p>
            <button 
              onClick={() => setRightPanelActive(false)} 
              className={styles.btn}
            >
              Iniciar Sesión
            </button>
          </div>
          <div className={`${styles.overlay__panel} ${styles.overlayRight}`}>
            <h2>¡Hola!</h2>
            <p>Regístrate para comenzar tu experiencia</p>
            <button 
              onClick={() => setRightPanelActive(true)} 
              className={styles.btn}
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}