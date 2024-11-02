import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import Splash from '@/app/splash'; 

// Menjaga splash screen tetap terlihat
SplashScreen.preventAutoHideAsync();

export default function HomeLayout() {
  const [loaded, error] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins Regular 400.ttf'), 
    'Poppins-Semibold': require('@/assets/fonts/Poppins SemiBold 600.ttf'),
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hideSplash = async () => {
      if (loaded) {
        await SplashScreen.hideAsync(); // Sembunyikan splash screen saat font telah dimuat
        setIsLoading(false);
      } else if (error) {
        console.error('Error loading fonts:', error);
        setIsLoading(false);
      }
    };
    
    hideSplash();
  }, [loaded, error]);

  if (isLoading) {
    return <Splash />; 
  }
  
  return (
    <Stack>
      {/* Tambahkan kode untuk menampilkan halaman utama aplikasi */}
      {/* Contoh: */}
      {/* <Stack.Screen name="Main" component={Main} /> */}
    </Stack>
  );
}
