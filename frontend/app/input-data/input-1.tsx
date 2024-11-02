import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Checkbox } from 'expo-checkbox'; // Menggunakan expo-checkbox
import { useRouter } from 'expo-router'; // Pastikan untuk menambahkan ini

export default function HealthDataInput() {
  const [name, setName] = useState('');
  const [jknNumber, setJknNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  
  type MedicalCondition = 'hypertension' | 'diabetes' | 'cholesterol' | 'heartDisease' | 'asthma' | 'kidneyDisease';

  const [medicalHistory, setMedicalHistory] = useState<Record<MedicalCondition, boolean>>({
    hypertension: false,
    diabetes: false,
    cholesterol: false,
    heartDisease: false,
    asthma: false,
    kidneyDisease: false,
  });
  
  const [isUnderMedication, setIsUnderMedication] = useState<boolean | null>(null);
  const [medicationDetails, setMedicationDetails] = useState('');
  const router = useRouter(); // Hook untuk navigasi

  const toggleMedicalHistory = (condition: MedicalCondition) => {
    setMedicalHistory((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }));
  };

  const handleNext = () => {
    // Navigasi ke halaman input-2
    router.push('./input-2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Input Data Kesehatan</Text>

        <View style={styles.logoItem}>
          <Image
            source={require('@/assets/images/health.png')}
            style={styles.logo}
          />
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="No. JKN"
          value={jknNumber}
          onChangeText={setJknNumber}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Usia"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        {/* Jenis Kelamin */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Jenis Kelamin:</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setGender('Laki-laki')}>
              <Text style={[styles.genderOption, gender === 'Laki-laki' && styles.selectedOption]}>Laki-laki</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('Perempuan')}>
              <Text style={[styles.genderOption, gender === 'Perempuan' && styles.selectedOption]}>Perempuan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Riwayat Medis Pribadi */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Riwayat Medis Pribadi:</Text>
          {Object.keys(medicalHistory).map((condition) => (
            <View key={condition} style={styles.checkboxContainer}>
              <Checkbox
                value={medicalHistory[condition as MedicalCondition]}
                onValueChange={() => toggleMedicalHistory(condition as MedicalCondition)}
                color={medicalHistory[condition as MedicalCondition] ? '#273A96' : undefined}
              />
              <Text>{condition.charAt(0).toUpperCase() + condition.slice(1)}</Text>
            </View>
          ))}
        </View>

        {/* Pengobatan Rutin */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Apakah Anda sedang dalam pengobatan rutin?</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setIsUnderMedication(true)}>
              <Text style={[styles.genderOption, isUnderMedication === true && styles.selectedOption]}>Ya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsUnderMedication(false)}>
              <Text style={[styles.genderOption, isUnderMedication === false && styles.selectedOption]}>Tidak</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isUnderMedication && (
          <TextInput
            style={styles.input}
            placeholder="Sebutkan obat yang dikonsumsi"
            value={medicationDetails}
            onChangeText={setMedicationDetails}
          />
        )}

        {/* Tombol Selanjutnya */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Selanjutnya</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#EFF8FF',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '95%',
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionContainer: {
    width: '95%',
    marginBottom: 15,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  genderOption: {
    fontSize: 16,
    padding: 10,
    color: '#333',
  },
  selectedOption: {
    color: '#273A96',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoItem: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#273A96',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
