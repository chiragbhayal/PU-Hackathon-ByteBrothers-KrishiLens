import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/auth-context';
import { LanguageProvider } from '../contexts/language-context';
import { StatsProvider } from '../contexts/stats-context';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <StatsProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="scan" />
            <Stack.Screen name="result" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </StatsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
