import { ThemeProvider, useTheme } from '@/context/theme-context';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

function AppContent() {
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/didacticiel');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="didacticiel" />
        <Stack.Screen name="register" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      {/* Dynamic StatusBar based on theme */}
      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
