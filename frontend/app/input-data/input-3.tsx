import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Input3({ navigation }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [vaccinationStatus, setVaccinationStatus] = useState({});
  const [mentalHealth, setMentalHealth] = useState('');
  const [geneticData, setGeneticData] = useState('');

  return (
    <View style={styles.container}>
      <Text>Berat Badan (kg):</Text>
      <TextInput value={weight} onChangeText={setWeight} style={styles.input} />

      <Text>Tinggi Badan (cm):</Text>
      <TextInput value={height} onChangeText={setHeight} style={styles.input} />

      {/* Blood Pressure, Vaccination, Mental Health, Genetic Data */}
      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Sebelumnya</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Data submitted')}>
        <Text>Kumpulkan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15 },
});
