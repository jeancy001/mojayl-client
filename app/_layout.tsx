import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/didacticiel');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Stack initialRouteName="index" screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="didacticiel" />
        <Stack.Screen name="register" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

