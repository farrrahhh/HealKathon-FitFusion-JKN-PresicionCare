// app/splash.tsx
import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Arahkan ke halaman Sign In setelah 2 detik
      router.push('/sign-in'); 
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require('@/assets/images/JKNPrecisionCare_Logo.png')}
        style={{ width: 291, height: 301 }}
      />
      <Text style={{ fontFamily: 'Poppins-Regular' }}>Analisis Cerdas untuk Kesehatan</Text>
      <Text style={{ fontFamily: 'Poppins-Regular' }}>Lebih Baik.</Text>

      <View
        style={{
          position: "absolute",
          alignItems: "center",
          bottom: 100
        }}
      >
        {/* Konten lain yang ingin ditampilkan di sini */}
      </View>
    </View>
  );
}
