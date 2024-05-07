import Colors from '@/constants/Colors';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { isLoading, useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

// SECURE AND CACHE THE JWT CACHE
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// cache the Clert JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  // fonts loading
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // expo router
  const router = useRouter();
  const segments = useSegments();
  // Clerk authentication control flow
  const { isLoaded, isSignedIn } = useAuth();

  // --------------------------------------------------
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // --------------------------------------------------
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // --------------------------------------------------
  // check if fonts were loaded
  // --------------------------------------------------
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // --------------------------------------------------
  // Clerk authentication control flow
  // --------------------------------------------------
  useEffect(() => {
    // if clerk is loading return
    if (!isLoaded) return;
    console.log("IsSigned status => ", isSignedIn);
    // check if we are on the protected folder
    const inAuthGroup = segments[0] === '(protected)';
    if (isSignedIn && !inAuthGroup) {
      router.replace('/(protected)/(tabs)/home');
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]);
  if (!loaded || !isLoaded) {
    return <Text>Loading application .....</Text>;
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='login' options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
        headerRight: () => (
          <Link href={'/help'} asChild>
            <TouchableOpacity onPress={router.back}>
              <Ionicons name='help-circle-outline' size={30} color={Colors.dark} />
            </TouchableOpacity>
          </Link>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name='arrow-back' size={30} color={Colors.dark} />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name='sign-up' options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name='arrow-back' size={30} color={Colors.dark} />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name='help' options={{
        title: 'Help',
        presentation: 'modal',
      }} />
      <Stack.Screen name='verify/[phone]' options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name='arrow-back' size={30} color={Colors.dark} />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name='(protected)/(tabs)' options={{
        headerShown: false,
      }} />
    </Stack>
  );

}

function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style='light' />
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

export default RootLayoutNav;
