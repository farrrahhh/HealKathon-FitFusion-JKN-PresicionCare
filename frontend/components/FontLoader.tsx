import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

const FontLoader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'), // Sesuaikan dengan path font
        // Tambahkan font lain jika perlu
      });
      setIsLoading(false);
    };

    loadFonts();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <>{children}</>;
};

export default FontLoader;
