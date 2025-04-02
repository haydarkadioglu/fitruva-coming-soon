// pages/index.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function ComingSoon() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [email, setEmail] = useState('');

  const launchDate = new Date('May 1, 2025 00:00:00').getTime();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Here you would typically send the email to your backend
    setEmail('');
    alert('Teşekkürler! Sizi bilgilendireceğiz.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-700 flex flex-col justify-center items-center p-4">
      <Head>
        <title>Çok Yakında Karşınızda | Fitulva</title>
        <meta name="description" content="Yakında hizmetinizdeyiz. Sağlıklı yaşamın anahtarı Fitulva'da!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Fitulva Logo"
            width={150}
            height={60}
            className="mx-auto"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Çok Yakında Karşınızdayız!
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-12">
          Sağlıklı yaşamın anahtarı için son hazırlıklarımızı yapıyoruz.
        </p>

        <div className="grid grid-cols-4 gap-4 mb-12">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-3xl md:text-5xl font-bold text-white">{days}</div>
            <div className="text-white">Gün</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-3xl md:text-5xl font-bold text-white">{hours}</div>
            <div className="text-white">Saat</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-3xl md:text-5xl font-bold text-white">{minutes}</div>
            <div className="text-white">Dakika</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-3xl md:text-5xl font-bold text-white">{seconds}</div>
            <div className="text-white">Saniye</div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-white mb-4">
            Hazır olduğumuzda haber vermemizi ister misiniz?
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              className="flex-grow px-4 py-2 rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Beni Bilgilendir
            </button>
          </form>
        </div>
      </main>

      <footer className="mt-16 text-white text-sm">
        <p>© {new Date().getFullYear()} Fitulva. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}