import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Checkbox } from 'expo-checkbox'; // Menggunakan expo-checkbox
import { useRouter } from 'expo-router'; // Pastikan untuk menambahkan ini

export default function FamilyHealthHistoryInput() {
  const [familyHistory, setFamilyHistory] = useState({
    hypertension: false,
    diabetes: false,
    heartDisease: false,
    cancer: false,
  });

  const [allergyHistory, setAllergyHistory] = useState<boolean | null>(null);
  const [allergyDetails, setAllergyDetails] = useState('');
  
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [smokingStatus, setSmokingStatus] = useState('');
  const [alcoholConsumption, setAlcoholConsumption] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<boolean | null>(null);
  const [dietaryDetails, setDietaryDetails] = useState('');

  const router = useRouter(); // Hook untuk navigasi

  const toggleFamilyHistory = (condition: keyof typeof familyHistory) => {
    setFamilyHistory((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }));
  };

  const handleNext = () => {
    // Navigasi ke halaman input-3
    router.push('./input-3');
  };

  const handlePrevious = () => {
    // Navigasi ke halaman input-1
    router.push('./input-1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Input Riwayat Kesehatan Keluarga</Text>

        {/* Riwayat Keluarga */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Riwayat Keluarga:</Text>
          <Text>Apakah ada anggota keluarga dekat (orang tua, saudara kandung) yang memiliki riwayat penyakit berikut?</Text>
          {Object.keys(familyHistory).map((condition) => (
            <View key={condition} style={styles.checkboxContainer}>
              <Checkbox
                value={familyHistory[condition as keyof typeof familyHistory]}
                onValueChange={() => toggleFamilyHistory(condition as keyof typeof familyHistory)}
                color={familyHistory[condition as keyof typeof familyHistory] ? '#273A96' : undefined}
              />
              <Text>{condition.charAt(0).toUpperCase() + condition.slice(1).replace(/([A-Z])/g, ' $1')}</Text>
            </View>
          ))}
        </View>

        {/* Riwayat Alergi */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Riwayat Alergi:</Text>
          <Text>Apakah Anda memiliki alergi terhadap obat atau makanan tertentu?</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setAllergyHistory(true)}>
              <Text style={[styles.genderOption, allergyHistory === true && styles.selectedOption]}>Ya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAllergyHistory(false)}>
              <Text style={[styles.genderOption, allergyHistory === false && styles.selectedOption]}>Tidak</Text>
            </TouchableOpacity>
          </View>
          {allergyHistory && (
            <TextInput
              style={styles.input}
              placeholder="Sebutkan alergi"
              value={allergyDetails}
              onChangeText={setAllergyDetails}
            />
          )}
        </View>

        {/* Gaya Hidup dan Aktivitas */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Gaya Hidup dan Aktivitas:</Text>
          <Text>Seberapa sering Anda berolahraga setiap minggu?</Text>
          {['Tidak pernah', '1-2 kali', '3-4 kali', 'Lebih dari 4 kali'].map((option) => (
            <TouchableOpacity key={option} onPress={() => setExerciseFrequency(option)}>
              <Text style={[styles.genderOption, exerciseFrequency === option && styles.selectedOption]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Apakah Anda merokok?</Text>
          {['Ya, aktif', 'Ya, pernah tapi sudah berhenti', 'Tidak pernah'].map((option) => (
            <TouchableOpacity key={option} onPress={() => setSmokingStatus(option)}>
              <Text style={[styles.genderOption, smokingStatus === option && styles.selectedOption]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Apakah Anda mengonsumsi alkohol?</Text>
          {['Tidak pernah', 'Kadang-kadang', 'Sering'].map((option) => (
            <TouchableOpacity key={option} onPress={() => setAlcoholConsumption(option)}>
              <Text style={[styles.genderOption, alcoholConsumption === option && styles.selectedOption]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pola Makan */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Pola Makan:</Text>
          <Text>Apakah Anda menjalani diet atau memiliki pantangan makanan tertentu?</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setDietaryRestrictions(true)}>
              <Text style={[styles.genderOption, dietaryRestrictions === true && styles.selectedOption]}>Ya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDietaryRestrictions(false)}>
              <Text style={[styles.genderOption, dietaryRestrictions === false && styles.selectedOption]}>Tidak</Text>
            </TouchableOpacity>
          </View>
          {dietaryRestrictions && (
            <TextInput
              style={styles.input}
              placeholder="Jelaskan pantangan makanan"
              value={dietaryDetails}
              onChangeText={setDietaryDetails}
            />
          )}
        </View>

        {/* Tombol Navigasi */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePrevious}>
            <Text style={styles.buttonText}>Sebelumnya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Selanjutnya</Text>
          </TouchableOpacity>
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#273A96',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
