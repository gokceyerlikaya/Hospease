require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hastaneYogunluk';

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
    alan_id: { type: Number, required: true, unique: true }
});
const Yogunluk = mongoose.model('Yogunluk', yogunlukSchema);

async function main() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB bağlantısı başarılı');

        // Temizle (opsiyonel)
        await Sehir.deleteMany({});
        await Hastane.deleteMany({});
        await Bolum.deleteMany({});
        await Alan.deleteMany({});
        await Yogunluk.deleteMany({});

        const sehirler = [
            { sehir_id: 34, sehir_adi: 'İstanbul' },
            { sehir_id: 6, sehir_adi: 'Ankara' },
            { sehir_id: 74, sehir_adi: 'Bartın' }
        ];
        await Sehir.insertMany(sehirler);

        const hastaneler = [
            { hastane_id: 101, hastane_adi: 'İstanbul Şehir Hastanesi', hastane_aciklamasi: 'Modern şehir hastanesi', sehir_id: 34 },
            { hastane_id: 102, hastane_adi: 'Ankara Numune Hastanesi', hastane_aciklamasi: 'Köklü devlet hastanesi', sehir_id: 6 },
            { hastane_id: 103, hastane_adi: 'Bartın Devlet Hastanesi', hastane_aciklamasi: 'Bartın halkına hizmet veren hastane', sehir_id: 74 },
            { hastane_id: 104, hastane_adi: 'Aktıp Hastanesi', hastane_aciklamasi: 'Aktıp özel hastanesi', sehir_id: 74 },
            { hastane_id: 105, hastane_adi: 'Deneme Devlet Hastanesi', hastane_aciklamasi: 'Deneme için oluştulurmuş bir hastane', sehir_id: 74 },
            { hastane_id: 106, hastane_adi: 'Aslan Özel Hastanesi', hastane_aciklamasi: 'Yalnızca GALATASARAY\'lılara hizmet veren bir hastane', sehir_id: 74 }
        ];
        await Hastane.insertMany(hastaneler);

        const bolumler = [
            { bolum_id: 201, bolum_adi: 'Acil Servis', hastane_id: 101 },
            { bolum_id: 202, bolum_adi: 'Dahiliye', hastane_id: 102 },
            { bolum_id: 203, bolum_adi: 'Kadın Doğum', hastane_id: 103 }
        ];
        await Bolum.insertMany(bolumler);

        const alanlar = [
            { alan_id: 301, alan_adi: 'Acil 1', bolum_id: 201 },
            { alan_id: 302, alan_adi: 'Dahiliye 1', bolum_id: 202 },
            { alan_id: 303, alan_adi: 'Kadın Doğum 1', bolum_id: 203 }
        ];
        await Alan.insertMany(alanlar);

        const yogunluklar = [
            { alan_id: 301, yogunluk_degeri: 12 },
            { alan_id: 302, yogunluk_degeri: 7 },
            { alan_id: 303, yogunluk_degeri: 3 }
        ];
        await Yogunluk.insertMany(yogunluklar);

        console.log('✅ Sahte veriler başarıyla eklendi.');
    } catch (err) {
        console.error('❌ Hata oluştu:', err);
    } finally {
        mongoose.disconnect();
    }
}

main();
