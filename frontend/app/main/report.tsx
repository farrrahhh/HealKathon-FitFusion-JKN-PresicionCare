import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ReportPage = () => {
  return (
    <View style={styles.container}>
      {/* Set StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#273296" />

      {/* Header with Back Icon and Centered Title */}
      <View style={styles.header}>
        <FontAwesome name="arrow-left" size={24} color="white" style={styles.backIcon} />
        <Text style={styles.headerTitle}>Report</Text>
      </View>

      {/* Report Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Informasi Pribadi</Text>
        <Text style={styles.infoText}>Nama: Ahmad Rahman</Text>
        <Text style={styles.infoText}>Usia: 45</Text>
        <Text style={styles.infoText}>Jenis Kelamin: Laki-laki</Text>

        {/* Medical History */}
        <Text style={styles.sectionTitle}>Riwayat Medis</Text>
        <Text style={styles.infoText}>Penyakit yang Pernah Dialami: Diabetes, Hipertensi</Text>
        <Text style={styles.infoText}>Riwayat Alergi: -</Text>
        <Text style={styles.infoText}>Riwayat Keluarga: Jantung, Diabetes</Text>

        {/* Last Vital Data */}
        <Text style={styles.sectionTitle}>Data Vital Terakhir</Text>
        <Text style={styles.infoText}>Berat Badan: 85 kg</Text>
        <Text style={styles.infoText}>Tinggi Badan: 175 cm</Text>
        <Text style={styles.infoText}>Tekanan Darah: 130/85 mmHg (hipertensi tahap 1)</Text>
        <Text style={styles.infoText}>Gula Darah: 95 mg/dL</Text>
        <Text style={styles.infoText}>Kolesterol: 210 mg/dL</Text>

        {/* Physical Activity */}
        <Text style={styles.sectionTitle}>Aktivitas Fisik</Text>
        <Text style={styles.infoText}>Jenis Aktivitas: Lari pagi dan angkat beban</Text>
        <Text style={styles.infoText}>Frekuensi: 4 kali seminggu</Text>
        <Text style={styles.infoText}>Durasi: 30-45 menit per sesi</Text>

        {/* Dietary Information */}
        <Text style={styles.sectionTitle}>Pola Makan</Text>
        <Text style={styles.infoText}>Diet Sehari-hari: -</Text>
        <Text style={styles.infoText}>Suplemen yang Dikonsumsi: -</Text>

        {/* Health Risk Analysis */}
        <Text style={styles.sectionTitle}>Hasil Analisis Risiko Kesehatan</Text>
        <Text style={styles.infoText}>Risiko Penyakit: Hipertensi (80%)</Text>
        <Text style={styles.infoText}>
          Rekomendasi Kesehatan: Disarankan untuk meningkatkan aktivitas fisik, mengurangi asupan garam, dan rutin memeriksa kadar kolesterol serta tekanan darah.
        </Text>

        {/* Report Date and Time */}
        <Text style={styles.sectionTitle}>Tanggal dan Waktu Laporan</Text>
        <Text style={styles.infoText}>Tanggal Laporan: 2024-11-02</Text>
        <Text style={styles.infoText}>Waktu Laporan: 10:30 AM</Text>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Kirim</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF8FF' },

  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    paddingTop: 50,
    backgroundColor: '#273296', 
    justifyContent: 'center',
  },

  backIcon: { 
    position: 'absolute', 
    left: 16, 
    top: 50,
    color: 'white',
  },
  
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white',
  },
  
  content: { padding: 16 },
  
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 20, 
    marginBottom: 8 
  },
  
  infoText: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 4 
  },
  
  sendButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#273296',
    borderRadius: 8,
    alignItems: 'center',
  },
  
  sendButtonText: { 
    fontSize: 16, 
    color: '#fff', 
    fontWeight: 'bold', 
    fontFamily: 'Poppins-Semibold'
  },
});

export default ReportPage;
