const axios = require('axios');

let kisiSayisi = 0;
const alanId = 1; // Simülasyon yaptığın alanın ID'si

// API adresini buraya yaz (backend adresin)
const API_URL = 'http://localhost:3000/api/sensors/update-kisi-sayisi';  // POST endpoint

// Sahte veri gönderen fonksiyon
const sahteGirisCikis = async () => {
    const hareket = Math.random() > 0.5 ? 1 : -1;  // %50 giriş ya da çıkış
    kisiSayisi += hareket;

    // Negatif olmaması için sıfırdan küçükse sıfırla
    if (kisiSayisi < 0) kisiSayisi = 0;

    try {
        const response = await axios.post(API_URL, {
            alan_id: alanId,
            kisi_sayisi: kisiSayisi
        });

        console.log(`[${new Date().toLocaleTimeString()}] Kişi ${hareket > 0 ? 'girdi' : 'çıktı'} ➡️ Yeni sayı: ${kisiSayisi}`);
    } catch (error) {
        console.error('❌ API isteği hatası:', error.message);
    }
};

// Her 5 saniyede bir sahte giriş/çıkış üret
setInterval(sahteGirisCikis, 5000);
