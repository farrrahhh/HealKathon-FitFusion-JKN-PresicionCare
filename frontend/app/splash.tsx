// app/splash.tsx
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

import { View, Text, Image, Dimensions } from 'react-native';

// Get screen width
const screenWidth = Dimensions.get("window").width;

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Arahkan ke halaman Sign In setelah 3 detik
      router.replace('/sign-in');

    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
    {/* Centered content */}
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <Image
        source={require("@/assets/images/JKNPrecisionCare_Logo.png")}
        style={{
          width: screenWidth * 0.6,   // Adjust size as 60% of screen width
          height: (screenWidth * 0.6) * (301 / 291), // Maintain aspect ratio
          resizeMode: "contain",      // Scale without stretching
        }}
      />
      <Text style={{ fontFamily: "Poppins-Regular" }}>
        Analisis Cerdas untuk Kesehatan
      </Text>
      <Text style={{ fontFamily: "Poppins-Regular" }}>Lebih Baik.</Text>
    </View>

    {/* Bottom content */}
    <View
      style={{
        position: "absolute",
        bottom: 10,
        width: "100%",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <Text style={{ fontFamily: "Poppins-Regular" }}>Powered by</Text>
      <Image
        source={require("@/assets/images/powered-by.png")}
        style={{
          width: screenWidth * 0.4,    // Adjust size as 40% of screen width
          height: (screenWidth * 0.4) * (84 / 174), // Maintain aspect ratio
          resizeMode: "contain",       // Scale without stretching
        }}
      />
    </View>
  </View>
  );
}
