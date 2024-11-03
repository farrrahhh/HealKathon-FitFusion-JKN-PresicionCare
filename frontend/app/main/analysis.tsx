import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function Analysis() {
    const router = useRouter();
    const insets = useSafeAreaInsets(); // To get padding for safe area
    const name = 'Ahmad Rahman';
    const age = 45;
    const weight = 85;
    const height = 175;
    const medicalRecord = ['Diabetes', 'Hipertensi'];
    const familyRecord = ['Jantung', 'Diabetes'];
    const risk = [
        {
            name:'Jantung',
            level: 0.4 ,
            factor:[]
        },
        {
            name: 'Kardiovaskular',
            level: 0.8 ,
            factor: ['Riwayat hipertensi', 'Riwayat diabetes tipe', 'BMI: 28', 'Riwayat keluarga diabetes', 'Riwayat keluarg jantung']
        },
    ] 
    const recommendation : string[] = ['Lakukan pemeriksaan kesehatan secara berkala, ikuti pola makan sehat, dan berolahraga minimal 30 menit sehari.'];
    const preventiveAction: string[] = ['Pemeriksaan Rutin: Cek gula darah dan tekanan darah setiap 3 bulan.','Pola Makan Sehat: Konsumsi makanan rendah gula, garam, dan lemak jenuh. Konsultasi dengan ahli gizi jika perlu.','Olahraga Teratur: Lakukan minimal 150 menit aktivitas fisik per minggu.','Kelola Stres: Praktekkan teknik relaksasi seperti meditasi atau yoga.'];

    risk.sort((a,b) => b.level - a.level);

    const [highlightedvalue, ...otherRisks] = risk;

    const handleBack = () => {
        router.back();
    }

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar backgroundColor='#273A96' barStyle="light-content" />

            <TouchableOpacity style={[styles.backButton, { top: insets.top + 10 }]} onPress={handleBack}>
                <Image source={require('@/assets/images/backButton.png')} style={styles.backButtonImage} />
            </TouchableOpacity>

            <View style={[styles.titleContainer, { marginTop: insets.top + 15 }]}>
                <Text style={styles.precision}>Precision</Text>
                <Text style={styles.analysis}>Analysis</Text>
            </View >
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.user}>
                        <Image source={require('@/assets/images/pfp.jpg')} style={styles.profile} />
                        <View style={styles.userDetails}>
                            <Text style={styles.userDetailsText}>Nama: {name}</Text>
                            <Text style={styles.userDetailsText}>Usia: {age}</Text>
                            <Text style={styles.userDetailsText}>Berat Badan: {weight} kg</Text>
                            <Text style={styles.userDetailsText}>Tinggi Badan: {height} cm</Text>
                            <Text style={styles.userDetailsText}>Riwayat Medis: {medicalRecord.join(', ')}</Text>
                            <Text style={styles.userDetailsText}>Riwayat Keluarga: {familyRecord.join(', ')}</Text>
                        </View>
                </View>

                <View style={styles.highlightRisk}>
                        <Text style={styles.highlightTextSemibold}>Skor Risiko {highlightedvalue.name}</Text>
                        <Text style={styles.highlightText}>Risiko: {highlightedvalue.level*100}%</Text>
                        <Text style={styles.highlightText}>Faktor Penyebab:</Text>
                        {highlightedvalue.factor.length > 0 ? (
                        <View >
                            {highlightedvalue.factor.map((factor, i) => (
                                <Text key={i} style={styles.highlightText}>
                                    • {factor}
                                </Text>
                            ))}
                        </View>
                    ) : (
                        <Text></Text>
                    )}
                </View>
                <View style={styles.additionalRisk}>
                    <Text style={styles.additionalTextSemibold}>Risiko Lain:</Text>
                    {otherRisks.map((risk, index) => (
                        <View key={index} style={styles.additionalWrapper}>
                            <Text style={styles.additionalText}>• {risk.name}</Text>
                            <Text style={styles.additionalText}>: {risk.level * 100}%</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.additionalRisk}>
                    <Text style={styles.additionalTextSemibold}>Rekomendasi:</Text>
                    {recommendation.map((r, index) => (
                        <View key={index} style={styles.additionalWrapper}>
                            <Text style={styles.additionalText}>• {r}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.additionalRisk}>
                    <Text style={styles.additionalTextSemibold}>Tindakan Preventif:</Text>
                    {preventiveAction.map((r, index) => (
                        <View key={index} style={styles.additionalWrapper}>
                            <Text style={styles.additionalText}>• {r}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#eff8ff',
        width: '100%',
        height: '100%',
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        zIndex: 10,
    },
    backButtonImage: {
        width: 40,
        height: 40,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
    },
    precision: {
        color: '#273A96',
        fontFamily: 'Poppins-Semibold',
        fontSize: 20,
        marginRight: 5,
    },
    analysis: {
        color: '#e94646',
        fontFamily: 'Poppins-Semibold',
        fontSize: 20,
    },
    user: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: '5%',
    },
    profile: {
        width: 110,
        height: 110,
        borderRadius: 150,
        marginRight: 20,
    },
    userDetails: {
        width: '50%',
        flex: 1,
    },
    userDetailsText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
    },
    scroll: {
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
        paddingBottom: 20,
        marginTop:40,
    },
    highlightRisk: {
        padding: 15,
        width:'90%',
        backgroundColor: '#e94646',
        borderRadius: 10,
        marginBottom:15,
    },
    highlightText: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        textAlign:'left',
    },
    highlightTextSemibold: {
        color: '#fff',
        fontFamily: 'Poppins-Semibold',
        fontSize: 14,
        textAlign:'left',
    },
    additionalRisk:{
        padding: 15,
        width:'96%',
    },
    additionalText:{
        color: '#000',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        textAlign:'left',
    },
    additionalTextSemibold: {
        color: '#000',
        fontFamily: 'Poppins-Semibold',
        fontSize: 14,
        textAlign:'left',
    },
    additionalWrapper:{
        flexDirection:'row',
    }
});
