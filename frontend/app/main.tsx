import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function Main(){
    const name = 'Rahman';
    const gender = 'M';
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bloodPressure,setBloodPressure] = useState('');
    const [bloodSugar, setBloodSugar] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const router = useRouter();

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleAnalysis = () => {
        router.push('/main/analysis')
    }
    const handleInput = () => {
        router.push('/main/input')
    }
    const handleReport = () => {
        router.push('/main/report')

    }
    const handleSimpan = () => {

    }

    const handleLogout = () => {
        setShowLogoutModal(true);
    }

    const confirmLogout = () => {
        setShowLogoutModal(false); // Hide the modal
        router.replace('/sign-in'); // Replace with the path to your sign-in screen
    }

    return(
        <SafeAreaView style={styles.background}>
                        {/* Logout confirmation modal */}
            {/* Logout confirmation modal */}
            <Modal
                transparent={true}
                visible={showLogoutModal}
                animationType="slide"
                onRequestClose={() => setShowLogoutModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirm Logout</Text>
                        <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.confirmButton} onPress={confirmLogout}>
                                <Text style={styles.confirmButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowLogoutModal(false)}>
                                <Text style={styles.cancelButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.top}>
                <View style={styles.topText}>
                    <Text style={styles.nameText}>Hi, {name}</Text>
                    <Text style={styles.descText}>Pemantauan kesehatan yang lebih cerdas untuk masa depan yang lebih sehat!</Text>
                </View>
                <Image source={require('@/assets/images/pfp.jpg')} style={styles.profilePic}/>
            </View>
            <ScrollView contentContainerStyle={styles.centeredContainer}>
                <View style={styles.container}>
                    <View style={styles.navigation}>
                        <TouchableOpacity style={styles.button} onPress={handleAnalysis}>
                            <Image source={require('@/assets/images/analysis.png')} style={styles.navigationImg}/> 
                            <Text style={styles.navigationText}>Analysis</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleInput}>
                            <Image source={require('@/assets/images/input.png')} style={styles.navigationImg}/> 
                            <Text style={styles.navigationText}>Input</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleReport}>
                            <Image source={require('@/assets/images/report.png')} style={styles.navigationImg}/> 
                            <Text style={styles.navigationText}>Report</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.catatanFisik}>
                        <View style={styles.textCatatan}>
                            <Text style={styles.noteText}>Catatan Fisik</Text>
                            <View style={styles.row}>
                            <Text style={styles.noteText}>Berat Badan (kg)   :</Text>
                            <TextInput 
                                value={weight} 
                                onChangeText={setWeight} 
                                style={styles.input} 
                                keyboardType='numeric'
                            />
                            </View>
                            <View style={styles.row}>
                            <Text style={styles.noteText}>Tinggi Badan (cm):</Text>
                            <TextInput 
                                value={height} 
                                onChangeText={setHeight} 
                                style={styles.input} 
                                keyboardType='numeric'
                            />
                            </View>

                            <View style={styles.row}>
                            <Text style={styles.noteText}>Tekanan Darah       :</Text>
                            <TextInput 
                                value={bloodPressure} 
                                onChangeText={setBloodPressure} 
                                style={styles.input}
                                keyboardType='numeric' 
                            />
                            </View>

                            <View style={styles.row}>
                            <Text style={styles.noteText}>Gula Darah               :</Text>
                            <TextInput 
                                value={bloodSugar} 
                                onChangeText={setBloodSugar} 
                                style={styles.input}
                                keyboardType='numeric' 
                            />
                            </View>

                            <View style={styles.row}>
                            <Text style={styles.noteText}>Kolesterol                  :</Text>
                            <TextInput 
                                value={cholesterol} 
                                onChangeText={setCholesterol} 
                                style={styles.input}
                                keyboardType='numeric' 
                            />
                            </View>
                        </View>
                            <TouchableOpacity style={styles.simpanButton} onPress={handleSimpan}>
                                <Text style={styles.buttonText}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                                            {/* Logout button */}
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Image source={require('@/assets/images/logoutbutton.png')} style={styles.logoutIcon}/>
                        </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background :{
        position:'absolute',
        backgroundColor: '#273A96',
        width:'100%',
        height:'100%',
        flex:1,
    },
    top:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center',
        width:'92%',
        height:'25%',
        alignSelf:'center',
    },
    topText:{
        margin:10,
        color:'#fff',
        width:'70%',
    },
    nameText:{
        color:'#fff',
        fontFamily:'Poppins-Semibold',
        fontSize:18
    },
    descText:{
        color:'#fff',
        fontFamily:'Poppins-Regular',
        fontSize:13,
    },
    profilePic:{
        width:60,
        height:60,
        borderRadius:50,
        margin:10,
    },
    container :{
        backgroundColor: '#eff8ff',
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
        width:'100%',
        height:'100%',
        flex:1,
    },
    navigation :{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        alignItems:'center'
    },
    button:{
        alignItems:'center',
        margin:20,
    },
    navigationImg:{
        width:75,
        height:75,
        borderRadius:20,
    },
    navigationText:{
        fontFamily:'Poppins-Semibold',
    },
    catatanFisik:{
        backgroundColor:'#fff',
        width:'90%',
        minHeight:'30%',
        height:'auto',
        alignItems:'baseline',
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Android Shadow
        elevation: 5,
        borderRadius:10,
        fontFamily:'Poppins-Semibold',
        alignSelf:'center',
    },
    textCatatan: {
        margin:10,
        width:'60%',
    }, 
    input: { 
        flex: 1,
        height: 20,            // Consistent height for alignment
        borderBottomWidth: 1,  // Bottom border for underline effect
        borderColor: '#ccc',
        marginLeft: 8,
        paddingHorizontal: 4,  // Small horizontal padding inside input
        fontFamily: 'Poppins-Semibold',
        paddingVertical: 0,   
        fontSize:12,
    },
    row: {
        flexDirection: 'row',
        alignContent:'center',
        justifyContent:'center',
        margin:3,
    },
    noteText:{
        fontFamily:'Poppins-Semibold',
        fontSize:13,
    },
    simpanButton:{
        alignSelf:'center',
        alignItems:'center',
        padding:10,
        margin:8,
        width:'30%',
        height:'auto',
        backgroundColor:'#273A96',
        borderRadius:5,
    },
    buttonText : {
        color:'#fff',
        fontFamily:'Poppins-Regular',
    },
    centeredContainer:{
        flexGrow:1,
    },
    strongArm : {
        width:31,
        height:31,
    },
    logoutButton: {
        position:'absolute',
        bottom: 20,
        left:15
    },
    logoutIcon: {
        height:30,
        width:35,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmButton: {
        flex: 1,
        backgroundColor: '#273A96',
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#ccc',
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 16,
    },
});