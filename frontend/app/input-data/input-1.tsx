import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Checkbox } from 'expo-checkbox'; // Menggunakan expo-checkbox
import { useRouter } from 'expo-router'; // Pastikan untuk menambahkan ini

export default function HealthDataInput() {
  const [name, setName] = useState('');
  const [jknNumber, setJknNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  
  type MedicalCondition = 'hypertension' | 'diabetes' | 'cholesterol' | 'heartDisease' | 'asthma' | 'kidneyDisease' | 'cancer';
type FamilyMedicalCondition = 'hypertension' | 'diabetes' | 'heartDisease' | 'cancer';
  const [medicalHistory, setMedicalHistory] = useState<Record<MedicalCondition, boolean>>({
    hypertension: false,
    diabetes: false,
    cholesterol: false,
    heartDisease: false,
    asthma: false,
    kidneyDisease: false,
    cancer: false,
  });
  
  const [isUnderMedication, setIsUnderMedication] = useState<boolean | null>(null);
  const [medicationDetails, setMedicationDetails] = useState('');
  
  const [familyHistory, setFamilyHistory] = useState<Record<FamilyMedicalCondition, boolean>>({
    hypertension: false,
    diabetes: false,
    heartDisease: false,
    cancer: false,
  });

  const [hasAllergy, setHasAllergy] = useState<boolean | null>(null);
  const [allergyDetails, setAllergyDetails] = useState('');

  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [smokingStatus, setSmokingStatus] = useState('');
  const [alcoholConsumption, setAlcoholConsumption] = useState('');
  const [dietDetails, setDietDetails] = useState<boolean | null>(null);
  const [dietDescription, setDietDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  
  const [hepatitisBVaccine, setHepatitisBVaccine] = useState<boolean | null>(null);
  const [influenzaVaccine, setInfluenzaVaccine] = useState<boolean | null>(null);
  
  const [mentalHealthHistory, setMentalHealthHistory] = useState<boolean | null>(null);
  const [mentalHealthDescription, setMentalHealthDescription] = useState('');
  
  const [geneticData, setGeneticData] = useState<boolean | null>(null);
  const [geneticDescription, setGeneticDescription] = useState('');

  const router = useRouter(); // Hook untuk navigasi

  const toggleMedicalHistory = (condition: MedicalCondition) => {
    setMedicalHistory((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }));
  };

  const toggleFamilyHistory = (condition: FamilyMedicalCondition) => {
    setFamilyHistory((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }));
  };
  const handleSubmit = async () => {
    const data = {
      name,
      jknNumber,
      age,
      gender,
      medicalHistory,
      isUnderMedication,
      medicationDetails,
      familyHistory,
      hasAllergy,
      allergyDetails,
      exerciseFrequency,
      smokingStatus,
      alcoholConsumption,
      dietDetails,
      dietDescription,
      weight,
      height,
      bloodPressure,
      bloodSugar,
      cholesterol,
      hepatitisBVaccine,
      influenzaVaccine,
      mentalHealthHistory,
      mentalHealthDescription,
      geneticData,
      geneticDescription,
    };

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      // Optionally handle success
      const result = await response.json();
      console.log('Data submitted successfully:', result);
      // Redirect or notify the user
      router.push('/success'); // Replace with your success page route
    } catch (error) {
      console.error('Error submitting data:', error);
    }
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

        {/* Riwayat Keluarga */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Riwayat Keluarga:</Text>
          {Object.keys(familyHistory).map((condition) => (
            <View key={condition} style={styles.checkboxContainer}>
              <Checkbox
                value={familyHistory[condition as FamilyMedicalCondition]}
                onValueChange={() => toggleFamilyHistory(condition as FamilyMedicalCondition)}
                color={familyHistory[condition as FamilyMedicalCondition] ? '#273A96' : undefined}
              />
              <Text>{condition.charAt(0).toUpperCase() + condition.slice(1)}</Text>
            </View>
          ))}
        </View>

        {/* Riwayat Alergi */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Riwayat Alergi:</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setHasAllergy(true)}>
              <Text style={[styles.genderOption, hasAllergy === true && styles.selectedOption]}>Ya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setHasAllergy(false)}>
              <Text style={[styles.genderOption, hasAllergy === false && styles.selectedOption]}>Tidak</Text>
            </TouchableOpacity>
          </View>
          {hasAllergy && (
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
          <Text style={styles.subLabel}>Seberapa sering Anda berolahraga setiap minggu?</Text>
          {['Tidak pernah', '1-2 kali', '3-4 kali', 'Lebih dari 4 kali'].map((option) => (
            <TouchableOpacity key={option} onPress={() => setExerciseFrequency(option)}>
              <Text style={[styles.genderOption, exerciseFrequency === option && styles.selectedOption]}>{option}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.subLabel}>Apakah Anda merokok?</Text>
          {['Ya, aktif', 'Ya, pernah tapi sudah berhenti', 'Tidak pernah'].map((option) => (
            <TouchableOpacity key={option} onPress={() => setSmokingStatus(option)}>
              <Text style={[styles.genderOption, smokingStatus === option && styles.selectedOption]}>{option}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.subLabel}>Apakah Anda mengonsumsi alkohol?</Text>
          {['Tidak pernah', 'Kadang-kadang', 'Sering'].map((option) => (
            <TouchableOpacity key={option} onPress={() => setAlcoholConsumption(option)}>
              <Text style={[styles.genderOption, alcoholConsumption === option && styles.selectedOption]}>{option}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.subLabel}>Apakah Anda menjalani diet atau memiliki pantangan makanan tertentu?</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setDietDetails(true)}>
              <Text style={[styles.genderOption, dietDetails === true && styles.selectedOption]}>Ya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDietDetails(false)}>
              <Text style={[styles.genderOption, dietDetails === false && styles.selectedOption]}>Tidak</Text>
            </TouchableOpacity>
          </View>
          {dietDetails && (
            <TextInput
              style={styles.input}
              placeholder="Sebutkan diet atau pantangan"
              value={dietDescription}
              onChangeText={setDietDescription}
            />
          )}
        </View>

       {/* Pengukuran Kesehatan */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Pengukuran Kesehatan:</Text>
          <TextInput
            style={styles.input}
            placeholder="Berat Badan (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Tinggi Badan (cm)"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Tekanan Darah"
            value={bloodPressure}
            onChangeText={setBloodPressure}
          />
          <TextInput
            style={styles.input}
            placeholder="Gula Darah"
            value={bloodSugar}
            onChangeText={setBloodSugar}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Kolesterol"
            value={cholesterol}
            onChangeText={setCholesterol}
            keyboardType="numeric"
          />
        </View>

        {/* Status Vaksinasi */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Status Vaksinasi:</Text>
          <Text>Vaksin Hepatitis B:</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setHepatitisBVaccine(true)}>
              <Text style={[styles.genderOption, hepatitisBVaccine === true && styles.selectedOption]}>Sudah</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setHepatitisBVaccine(false)}>
              <Text style={[styles.genderOption, hepatitisBVaccine === false && styles.selectedOption]}>Belum</Text>
            </TouchableOpacity>
          </View>
          <Text>Vaksin Influenza:</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setInfluenzaVaccine(true)}>
              <Text style={[styles.genderOption, influenzaVaccine === true && styles.selectedOption]}>Sudah</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setInfluenzaVaccine(false)}>
              <Text style={[styles.genderOption, influenzaVaccine === false && styles.selectedOption]}>Belum</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Riwayat Kesehatan Mental */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Riwayat Kesehatan Mental:</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setMentalHealthHistory(true)}>
              <Text style={[styles.genderOption, mentalHealthHistory === true && styles.selectedOption]}>Ya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMentalHealthHistory(false)}>
              <Text style={[styles.genderOption, mentalHealthHistory === false && styles.selectedOption]}>Tidak</Text>
            </TouchableOpacity>
          </View>
          {mentalHealthHistory && (
            <TextInput
              style={styles.input}
              placeholder="Sebutkan kondisi"
              value={mentalHealthDescription}
              onChangeText={setMentalHealthDescription}
            />
          )}
        </View>

        {/* Data Genetik */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Data Genetik:</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setGeneticData(true)}>
              <Text style={[styles.genderOption, geneticData === true && styles.selectedOption]}>Ya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGeneticData(false)}>
              <Text style={[styles.genderOption, geneticData === false && styles.selectedOption]}>Tidak</Text>
            </TouchableOpacity>
          </View>
          {geneticData && (
            <TextInput
              style={styles.input}
              placeholder="Sebutkan data genetik"
              value={geneticDescription}
              onChangeText={setGeneticDescription}
            />
          )}
        </View>


          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Kumpulkan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#EFF8FF',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  sectionContainer: {
    marginBottom: 20,

  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins-Semibold',
  },
  subLabel: {
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  genderOption: {
    backgroundColor: '#F3F3E0',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 5,
    fontFamily: 'Poppins-Regular',
  },
  selectedOption: {
    backgroundColor: '#273A96',
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#273A96',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#133E87',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',

  },
});
