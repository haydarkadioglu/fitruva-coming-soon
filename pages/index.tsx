// pages/index.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/ComingSoon.module.css';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ComingSoon() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const launchDate = new Date('September 1, 2025 00:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Add email to Firebase Firestore
      await addDoc(collection(db, "subscribers"), {
        email,
        subscribedAt: serverTimestamp()
      });
      
      setEmail('');
      setSubmitStatus({ 
        type: 'success', 
        message: 'Teşekkürler! Sizi bilgilendireceğiz.' 
      });
    } catch (error) {
      console.error("Error adding subscriber: ", error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Çok Yakında Karşınızda | Fitruva</title>
        <meta name="description" content="Yakında hizmetinizdeyiz. Sağlıklı yaşamın anahtarı Fitruva'da!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Fitruva Logo"
            width={150}
            height={60}
            className={styles.logo}
          />
        </div>

        <h1 className={styles.title}>
          Çok Yakında Karşınızdayız!
        </h1>
        
        <p className={styles.description}>
          Sağlıklı yaşamın anahtarı için son hazırlıklarımızı yapıyoruz.
        </p>

        <div className={styles.countdown}>
          <div className={styles.countdownItem}>
            <div className={styles.countdownValue}>{days}</div>
            <div className={styles.countdownLabel}>Gün</div>
          </div>
          <div className={styles.countdownItem}>
            <div className={styles.countdownValue}>{hours}</div>
            <div className={styles.countdownLabel}>Saat</div>
          </div>
          <div className={styles.countdownItem}>
            <div className={styles.countdownValue}>{minutes}</div>
            <div className={styles.countdownLabel}>Dakika</div>
          </div>
          <div className={styles.countdownItem}>
            <div className={styles.countdownValue}>{seconds}</div>
            <div className={styles.countdownLabel}>Saniye</div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>
            Hazır olduğumuzda haber vermemizi ister misiniz?
          </h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              className={styles.input}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Beni Bilgilendir'}
            </button>
          </form>
          {submitStatus.message && (
            <p className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
              {submitStatus.message}
            </p>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Fitulva. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}