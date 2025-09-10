import {View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import axios from "axios";
import {router} from "expo-router";

export default function HomePage() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);

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

    useEffect(() => {
        fecthHospitals();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;

    }
    if (error) {
        return <Text>{error}</Text>;

    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#f0f4f8',
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: 'center',
        }}>
            <View>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginVertical: 20,
                    color: '#1953ac',
                }}>
                    Bulunduğunuz İldeki Hastaneler
                </Text>
            </View>
            <View style={{
                flex: 1,
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: '#fff',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            }}>
                <FlatList
                    data={hospitals}
                    keyExtractor={item => item.hastane_id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#fff',
                                padding: 15,
                                borderRadius: 10,
                                marginBottom: 10,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                            }}
                            onPress={() => router.push(`/Detaylar?hospitalId=${item.hastane_id}`)}
                            activeOpacity={0.6}
                        >
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1953ac' }}>
                                {item.hastane_adi}
                            </Text>
                            <Text style={{ color: '#555', marginTop: 5 }}>
                                {item.hastane_aciklamasi}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

