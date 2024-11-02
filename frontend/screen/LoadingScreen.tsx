import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";

export default function LoadingScreen(){
    return(
        <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require('@/assets/images/JKNPrecisionCare_Logo.png')}
          style={{width:291, height:301}}
        />
        <Text
        style={
          {
            fontFamily:'Poppins-Regular'
          }
        }>Analisis Cerdas untuk Kesehatan</Text>
              <Text
        style={
          {
            fontFamily:'Poppins-Regular'
          }
        }>Lebih Baik.</Text>
  
  
        <View
        style={
          {
            position:"absolute",
            alignItems:"center",
            bottom:100
          }
        }>
          <Text>
            teste
          </Text>
        </View>
        
  
      </View>
    );
}