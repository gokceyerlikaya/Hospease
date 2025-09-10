require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sensorRoutes = require('./routes/sensors');


const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sensors', sensorRoutes);

// MongoDB bağlantısı
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ MongoDB bağlantısı başarılı');
        app.listen(PORT, () => {
            console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
            // sahteVeriEkle(); // Açmak istersen aktif edebilirsin
        });
    })
    .catch(err => {
        console.error('❌ MongoDB bağlantı hatası:', err);
    });

// MODELLER

const sehirSchema = new mongoose.Schema({
    sehir_id: { type: Number, required: true, unique: true },
    sehir_adi: { type: String, required: true }
});
const Sehir = mongoose.model('Sehir', sehirSchema);

const hastaneSchema = new mongoose.Schema({
    hastane_id: { type: Number, required: true, unique: true },
    hastane_adi: { type: String, required: true },
    hastane_aciklamasi: { type: String, required: true },
    sehir_id: { type: Number, required: true }
});
const Hastane = mongoose.model('Hastane', hastaneSchema, 'hastanes');

const bolumSchema = new mongoose.Schema({
    bolum_id: { type: Number, required: true, unique: true },
    bolum_adi: { type: String, required: true },
    hastane_id: { type: Number, required: true }
});
const Bolum = mongoose.model('Bolum', bolumSchema);

const alanSchema = new mongoose.Schema({
    alan_id: { type: Number, required: true, unique: true },
    alan_adi: { type: String, required: true },
    bolum_id: { type: Number, required: true }
});
const Alan = mongoose.model('Alan', alanSchema);

const yogunlukSchema = new mongoose.Schema({
    yogunluk_degeri: { type: Number, required: true },
    alan_id: { type: Number, required: true, unique: true } // Sadece alan_id benzersiz olacak
});
const Yogunluk = mongoose.model('Yogunluk', yogunlukSchema);

// ENDPOINTLER

// 🔹 Şehirleri getir
app.get('/api/sehirler', async (req, res) => {
    try {
        const sehirler = await Sehir.find();
        res.status(200).json(sehirler);
    } catch (err) {
        res.status(500).json({ message: "Şehirler alınırken hata oluştu." });
    }
});

// 🔹 Sehire göre hastaneleri getir
app.get('/api/sehir/:sehir_id/hastaneler', async (req, res) => {
    try {
        const hastaneler = await Hastane.find({ sehir_id: req.params.sehir_id });
        res.status(200).json(hastaneler);
    } catch (err) {
        res.status(500).json({ message: "Hastaneler alınırken hata oluştu." });
    }
});

// 🔹 Hastanenin bölümlerini getir
app.get('/api/hastane/:hastane_id/bolumler', async (req, res) => {
    try {
        const bolumler = await Bolum.find({ hastane_id: req.params.hastane_id });
        res.status(200).json(bolumler);
    } catch (err) {
        res.status(500).json({ message: "Bölümler alınırken hata oluştu." });
    }
});

// 🔹 Bölümün alanlarını getir
app.get('/api/bolum/:bolum_id/alanlar', async (req, res) => {
    try {
        const alanlar = await Alan.find({ bolum_id: req.params.bolum_id });
        res.status(200).json(alanlar);
    } catch (err) {
        res.status(500).json({ message: "Alanlar alınırken hata oluştu." });
    }
});

// 🔹 Alanın yoğunluğunu getir
app.get('/api/alan/:alan_id/yogunluk', async (req, res) => {
    try {
        const yogunluk = await Yogunluk.findOne({ alan_id: req.params.alan_id });
        if (!yogunluk) {
            return res.status(404).json({ message: "Yoğunluk bulunamadı." });
        }
        res.status(200).json(yogunluk);
    } catch (err) {
        res.status(500).json({ message: "Yoğunluk alınırken hata oluştu." });
    }
});

// 🔹 Tüm hastaneler (var olan)
app.get('/api/hastanes', async (req, res) => {
    try {
        const hastaneler = await Hastane.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(hastaneler);
    } catch (err) {
        console.error("❌ Hastane verilerini alırken hata oluştu:", err);
        res.status(500).json({ message: "Hastane verilerini alırken bir hata oluştu" });
    }
});

// 🔹 Tekil hastane bilgisi
app.get('/api/hastane/:id', async (req, res) => {
    try {
        const hastane = await Hastane.findOne({ hastane_id: req.params.id });
        if (!hastane) {
            return res.status(404).json({ message: "Hastane bulunamadı" });
        }
        res.json(hastane);
    } catch (err) {
        console.error("❌ Hastane verilerini alırken hata oluştu:", err);
        res.status(500).json({ message: "Hastane verilerini alırken bir hata oluştu" });
    }
});

module.exports = { Hastane, Sehir, Bolum, Alan, Yogunluk };
