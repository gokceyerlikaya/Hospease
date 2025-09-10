import {View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView} from 'react-native';
import { useRouter } from 'expo-router';
// @ts-ignore
import hastaneImage from "../assets/images/Hospital.png";
// @ts-ignore
import bgImage from '../assets/images/landingPageBG.png';
// @ts-ignore
import hospitalIcon from '../assets/images/40.png';
// @ts-ignore
import favoritesIcon from '../assets/images/41.png';

export default function LandingPage() {
    const router = useRouter();

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#f0f4f8',
            alignItems: 'center',
            position: "relative",
        }}>
            <Image
                source={bgImage}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                }}/>
            <View style={{
                position: "absolute",
                top: 130
            }}>
                <Text style={{
                    fontSize: 38,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: "center"
                }}>Sağlığa Hemen Ulaş</Text>
            </View>
            <SafeAreaView style={styles.container}>
                <View style={{
                    gap: 36,
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: 'rgba(78,106,132,0.55)',
                        borderRadius: 12,
                        paddingHorizontal: 26,
                        paddingVertical: 18,
                        alignItems: 'center',
                        display: "flex",
                        flexDirection: "row",
                        gap: 12
                    }} onPress={() => router.push('/home')}>
                        <Image
                            source={hospitalIcon}
                            style={{
                                width: 40,
                                height: 40,
                            }}/>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: "center"
                        }}>Hastaneleri Göster</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: 'rgba(78,106,132,0.55)',
                        borderRadius: 12,
                        paddingHorizontal: 26,
                        paddingVertical: 18,
                        alignItems: 'center',
                        display: "flex",
                        flexDirection: "row",
                        gap: 12
                    }} onPress={() => router.push('/home')}>
                        <Image
                            source={favoritesIcon}
                            style={{
                                width: 40,
                                height: 40,
                            }}/>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: "center"
                        }}>Favori Hastanelerim</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: 24,
        marginTop: 240
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 32,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 16,
        color: '#4a5568',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#2b6cb0',
        paddingVertical: 14,
        paddingHorizontal: 36,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#2b6cb0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
