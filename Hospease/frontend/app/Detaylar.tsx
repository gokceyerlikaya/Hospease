import React, {useEffect, useState} from "react";
import {View, Text, ActivityIndicator, Image, FlatList, StyleSheet} from "react-native";
import axios from "axios";

export default function Detaylar() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [bolumler, setBolumler] = useState<Bolum[]>([]);
    const [alanlar, setAlanlar] = useState<Alan[]>([]);
    const [yogunluk, setYogunluk] = useState<Yogunluk>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fecthHospitals = () => {
        axios.get('http://192.168.132.191:3000/api/sehir/74/hastaneler')
            .then(response => {
                setHospitals(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Hastane verileri alınırken bir hata oluştu.' + err);
                setLoading(false);
            });
    }

    const fetchHospitalFields = () => {
        axios.get('http://192.168.132.191:3000/api/hastane/103/bolumler')
            .then(response => {
                setBolumler(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Bölüm verileri alınırken bir hata oluştu.' + err);
                setLoading(false);
            });
    }

    const fetchBolumunAlani = () => {
        axios.get('http://192.168.132.191:3000/api/bolum/203/alanlar')
            .then(response => {
                setAlanlar(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Alan verileri alınırken bir hata oluştu.' + err);
                setLoading(false);
            });
    }

    const fetchYogunluk = () => {
        axios.get('http://192.168.132.191:3000/api/alan/303/yogunluk')
            .then(response => {
                setYogunluk(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Yoğunluk verileri alınırken bir hata oluştu.' + err);
                setLoading(false);
            });
    }

    useEffect(() => {
        fecthHospitals();
        fetchHospitalFields();
        fetchBolumunAlani();
        fetchYogunluk();
    }, []);

    useEffect(() => {
        simulateSensorData();

        // 60 saniyede bir güncelle
        const interval = setInterval(() => {
            simulateSensorData();
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;

    }
    if (error) {
        return <Text>{error}</Text>;

    }
    const getBackgroundColor = (deger: number) => {
        const green = Math.max(0, 255 - ((deger - 1) * 25));
        const red = Math.min(255, ((deger - 1) * 30));
        return `rgb(${red},${green},0)`;
    };
    const simulateSensorData = () => {

        const kisiSayisi = Math.floor(Math.random() * 101); // 0 ile 100 arası

        const yogunluk_degeri = Math.min(10, Math.max(1, Math.round(kisiSayisi / 10)));

        const fakeYogunluk = {
            _id: "test",
            alan_id: 303,
            yogunluk_degeri,
            __v: 0,
        };
        setYogunluk(fakeYogunluk);
    };


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={hospitals}
                keyExtractor={item => item.hastane_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.hospitalCard}>
                        <View style={{
                            elevation: 3,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            borderRadius: 12,
                        }}>
                            <Image
                                src={"https://www.tis.com.tr/wp-content/uploads/2021/04/bartin2-e1617862498684.jpg"}
                                style={{
                                    width: '100%',
                                    height: 150,
                                    borderRadius: 12,
                                }}/>
                        </View>
                        <View>
                            <Text style={styles.hospitalName}>Hastane Adı: {item.hastane_adi}</Text>
                            <Text style={styles.sectionText}>Hastane Açıklaması: {item.hastane_aciklamasi}</Text>
                        </View>
                        <View>
                            {bolumler.map((bolum) => (
                                <View key={bolum._id}>
                                    <Text style={styles.sectionText}>
                                        Bölüm: {bolum.bolum_adi}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#2b6cb0',
                            }}>
                                Mevcut Durumu:
                            </Text>
                        </View>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 10,
                            borderRadius: 12,
                            backgroundColor: getBackgroundColor(yogunluk?.yogunluk_degeri || 1),
                        }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                {yogunluk?.yogunluk_degeri}
                            </Text>
                        </View>

                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f5fa', paddingHorizontal: 16, paddingTop: 40 },
    pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#2b6cb0', marginBottom: 16 },
    hospitalCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        gap: 12,
    },
    hospitalName: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    sectionCard: { paddingVertical: 6, paddingLeft: 8 },
    sectionText: { fontSize: 16, color: '#444' },
});

