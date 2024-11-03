import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Checkbox } from 'expo-checkbox'; // Menggunakan expo-checkbox
import { useRouter } from 'expo-router'; // Pastikan untuk menambahkan ini
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HealthDataInput() {
  const [userId, setUserId] = useState('');
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

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        setUserId(id);
        // Fetch existing health data for this user
        fetchHealthData(id);
      }
    };

    fetchUserId();
  }, []);

  const fetchHealthData = async (userId: string) => {
    try {
      const storedData = await AsyncStorage.getItem(`healthData_${userId}`);
      if (storedData) {
        const data = JSON.parse(storedData);
        setName(data.name || '');
        setJknNumber(data.jknNumber || '');
        setAge(data.age || '');
        setGender(data.gender || '');
        setMedicalHistory(data.medicalHistory || {});
        setIsUnderMedication(data.isUnderMedication);
        setMedicationDetails(data.medicationDetails || '');
        setFamilyHistory(data.familyHistory || {});
        setHasAllergy(data.hasAllergy);
        setAllergyDetails(data.allergyDetails || '');
        setExerciseFrequency(data.exerciseFrequency || '');
        setSmokingStatus(data.smokingStatus || '');
        setAlcoholConsumption(data.alcoholConsumption || '');
        setDietDetails(data.dietDetails);
        setDietDescription(data.dietDescription || '');
        setWeight(data.weight || '');
        setHeight(data.height || '');
        setBloodPressure(data.bloodPressure || '');
        setBloodSugar(data.bloodSugar || '');
        setCholesterol(data.cholesterol || '');
        setHepatitisBVaccine(data.hepatitisBVaccine);
        setInfluenzaVaccine(data.influenzaVaccine);
        setMentalHealthHistory(data.mentalHealthHistory);
        setMentalHealthDescription(data.mentalHealthDescription || '');
        setGeneticData(data.geneticData);
        setGeneticDescription(data.geneticDescription || '');
      }
    } catch (error) {
      console.error('Error fetching health data:', error);
    }
  };

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
      userId,
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
      const response = await fetch('http://192.168.1.10:3000/api/health-data', { // Replace with your machine's IP address
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save health data');
      }

      // Store the health data in AsyncStorage for later retrieval
      await AsyncStorage.setItem(`healthData_${userId}`, JSON.stringify(data));

      console.log('Health data saved successfully');
      router.push('../main');
    } catch (error) {
      console.error('Error saving health data:', error);
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
            <TouchableOpacity onPress={() => setGender('male')}>
              <Text style={[styles.genderOption, gender === 'male' && styles.selectedOption]}>Laki-laki</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('female')}>
              <Text style={[styles.genderOption, gender === 'female' && styles.selectedOption]}>Perempuan</Text>
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

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Apakah Anda sedang dalam pengobatan rutin?</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isUnderMedication === true}
              onValueChange={() => setIsUnderMedication(!isUnderMedication)}
              color={isUnderMedication ? '#273A96' : undefined}
            />
            <Text>Ya</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isUnderMedication === false}
              onValueChange={() => setIsUnderMedication(!isUnderMedication)}
              color={isUnderMedication === false ? '#273A96' : undefined}
            />
            <Text>Tidak</Text>
          </View>
          {isUnderMedication === true && (
            <TextInput
              style={styles.input}
              placeholder="Detail Pengobatan"
              value={medicationDetails}
              onChangeText={setMedicationDetails}
            />
          )}
        </View>

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
          <Text style={styles.label}>Apakah Anda memiliki riwayat alergi?</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={hasAllergy === true}
              onValueChange={() => setHasAllergy(!hasAllergy)}
              color={hasAllergy ? '#273A96' : undefined}
            />
            <Text>Ya</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={hasAllergy === false}
              onValueChange={() => setHasAllergy(!hasAllergy)}
              color={hasAllergy === false ? '#273A96' : undefined}
            />
            <Text>Tidak</Text>
          </View>
          {hasAllergy === true && (
            <TextInput
              style={styles.input}
              placeholder="Detail Alergi"
              value={allergyDetails}
              onChangeText={setAllergyDetails}
            />
          )}
        </View>

        {/* Gaya Hidup dan Aktivitas */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Frekuensi Olahraga:</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: 3 kali seminggu"
            value={exerciseFrequency}
            onChangeText={setExerciseFrequency}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Apakah Anda merokok?</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={smokingStatus === 'yes'}
              onValueChange={() => setSmokingStatus(smokingStatus === 'yes' ? 'no' : 'yes')}
              color={smokingStatus === 'yes' ? '#273A96' : undefined}
            />
            <Text>Ya</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={smokingStatus === 'no'}
              onValueChange={() => setSmokingStatus(smokingStatus === 'no' ? 'yes' : 'no')}
              color={smokingStatus === 'no' ? '#273A96' : undefined}
            />
            <Text>Tidak</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Apakah Anda mengkonsumsi alkohol?</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={alcoholConsumption === 'yes'}
              onValueChange={() => setAlcoholConsumption(alcoholConsumption === 'yes' ? 'no' : 'yes')}
              color={alcoholConsumption === 'yes' ? '#273A96' : undefined}
            />
            <Text>Ya</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={alcoholConsumption === 'no'}
              onValueChange={() => setAlcoholConsumption(alcoholConsumption === 'no' ? 'yes' : 'no')}
              color={alcoholConsumption === 'no' ? '#273A96' : undefined}
            />
            <Text>Tidak</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Pola Makan:</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={dietDetails === true}
              onValueChange={() => setDietDetails(!dietDetails)}
              color={dietDetails ? '#273A96' : undefined}
            />
            <Text>Sehat</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={dietDetails === false}
              onValueChange={() => setDietDetails(!dietDetails)}
              color={dietDetails === false ? '#273A96' : undefined}
            />
            <Text>Tidak Sehat</Text>
          </View>
          {dietDetails === true && (
            <TextInput
              style={styles.input}
              placeholder="Deskripsikan pola makan Anda"
              value={dietDescription}
              onChangeText={setDietDescription}
            />
          )}
        </View>

        {/* Pengukuran Kesehatan */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Berat Badan (kg):</Text>
          <TextInput
            style={styles.input}
            placeholder="Berat Badan"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Tinggi Badan (cm):</Text>
          <TextInput
            style={styles.input}
            placeholder="Tinggi Badan"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Tekanan Darah:</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: 120/80"
            value={bloodPressure}
            onChangeText={setBloodPressure}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Gula Darah:</Text>
          <TextInput
            style={styles.input}
            placeholder="Gula Darah"
            value={bloodSugar}
            onChangeText={setBloodSugar}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Kolesterol:</Text>
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
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={hepatitisBVaccine === true}
              onValueChange={() => setHepatitisBVaccine(!hepatitisBVaccine)}
              color={hepatitisBVaccine ? '#273A96' : undefined}
            />
            <Text>Hepatitis B</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={influenzaVaccine === true}
              onValueChange={() => setInfluenzaVaccine(!influenzaVaccine)}
              color={influenzaVaccine ? '#273A96' : undefined}
            />
            <Text>Influenza</Text>
          </View>
        </View>

        {/* Riwayat Kesehatan Mental */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Riwayat Kesehatan Mental:</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={mentalHealthHistory === true}
              onValueChange={() => setMentalHealthHistory(!mentalHealthHistory)}
              color={mentalHealthHistory ? '#273A96' : undefined}
            />
            <Text>Ya</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={mentalHealthHistory === false}
              onValueChange={() => setMentalHealthHistory(!mentalHealthHistory)}
              color={mentalHealthHistory === false ? '#273A96' : undefined}
            />
            <Text>Tidak</Text>
          </View>
          {mentalHealthHistory === true && (
            <TextInput
              style={styles.input}
              placeholder="Detail Kesehatan Mental"
              value={mentalHealthDescription}
              onChangeText={setMentalHealthDescription}
            />
          )}
        </View>

        {/* Data Genetik */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Data Genetik:</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={geneticData === true}
              onValueChange={() => setGeneticData(!geneticData)}
              color={geneticData ? '#273A96' : undefined}
            />
            <Text>Ya</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={geneticData === false}
              onValueChange={() => setGeneticData(!geneticData)}
              color={geneticData === false ? '#273A96' : undefined}
            />
            <Text>Tidak</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Perbarui</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#273A96',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  genderOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: '#273A96',
    color: '#fff',
  },
});

// export default Input3;
