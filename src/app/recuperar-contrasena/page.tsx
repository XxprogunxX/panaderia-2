'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebaseConfig';
import styles from './LoginForm.module.css';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Se ha enviado un correo para restablecer tu contraseña');
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      let errorMessage = 'Error al enviar el correo';
      switch (firebaseError.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido';
          break;
        default:
          errorMessage = firebaseError.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container} style={{ maxWidth: '500px' }}>
      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={() => setError('')} className={styles.closeError}>×</button>
        </div>
      )}
      
      {success && (
        <div style={{ 
          backgroundColor: '#4BB543', 
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {success}
          <button onClick={() => setSuccess('')} style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            cursor: 'pointer' 
          }}>×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.form__title}>Recuperar Contraseña</h2>
        <p>Ingresa tu correo electrónico para recibir un enlace de recuperación</p>
        <input 
          type="email" 
          placeholder="Email" 
          className={styles.input} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <button 
          type="submit" 
          className={styles.btn}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Correo'}
        </button>
        <button 
          type="button" 
          className={styles.btn}
          style={{ backgroundColor: '#333', borderColor: '#333' }}
          onClick={() => router.push('/login')}
        >
          Volver al Login
        </button>
      </form>
    </div>
  );
}