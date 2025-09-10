// routes/sensors.js
const express = require('express');
const router = express.Router();
const { Yogunluk } = require('../server'); // Modeller server.js içinde ise bu şekilde import edebilirsin, yoksa modelleri ayrı dosyada yönet

// Yoğunluk verisini güncelleme endpointi
router.post('/update', async (req, res) => {
    try {
        const { alan_id, giris, cikis } = req.body;

        if (!alan_id) return res.status(400).json({ message: "alan_id gerekli" });

        // Yoğunluk değeri olarak giriş-çıkış farkını hesapla
        const yogunlukDegeri = giris - cikis;

        let yogunluk = await Yogunluk.findOne({ alan_id });
        if (yogunluk) {
            yogunluk.yogunluk_degeri = yogunlukDegeri;
            await yogunluk.save();
        } else {
            yogunluk = new Yogunluk({ alan_id, yogunluk_degeri: yogunlukDegeri });
            await yogunluk.save();
        }

        res.status(200).json({ message: "Yoğunluk güncellendi", yogunluk });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

module.exports = router;
