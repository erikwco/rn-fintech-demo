import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { isClerkAPIResponseError, useAuth, useSignIn } from '@clerk/clerk-expo';


enum SignInType {
  Phone,
  Email,
  Google,
  Apple
}

// -----------------------------------------------------------
// Render
// -----------------------------------------------------------
const LoginPage = () => {
  // local state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+503');

  // keyboard offset control 
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const { signIn } = useSignIn();
  const { isSignedIn } = useAuth();

  useEffect(() => {

    if (!isSignedIn) return;
    if (isSignedIn) {
      router.replace('/(protected)/(tabs)/home');
    }
  }, [isSignedIn])


  // signun function
  const onSignin = async (type: SignInType) => {
    try {
      switch (type) {
        case SignInType.Phone:
          const fullPhoneNumber = `${countryCode}${phoneNumber}`;
          // we check which factors are available, and passing the phone 
          // we can check if the country is allowed
          const { supportedFirstFactors } = await signIn!.create({
            identifier: fullPhoneNumber,
          });

          const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
            return factor.strategy === 'phone_code';
          });

          const { phoneNumberId } = firstPhoneFactor;
          await signIn!.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId,
          })


          // wait for verification
          router.push({
            pathname: '/verify/[phone]',
            params: { phone: fullPhoneNumber, signin: 'true' },
          });

          break;
        case SignInType.Email:
          console.log('log in by email');
          break;
        case SignInType.Apple:
          console.log('log in by apple');
          break;
        case SignInType.Google:
          console.log('log in by google');
          break;
      }
    } catch (error) {
      console.log('SignIn error:', JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === 'form_identifier_not_found') {
          Alert.alert('Error', error.errors[0].message);
        }
      }
    }
  }



  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back!</Text>
        <Text style={defaultStyles.descriptionText}>Enter your phone number associated with your account</Text>
        {/* // phone number computed input text */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Contry code'
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder='Mobile number'
            placeholderTextColor={Colors.gray}
            keyboardType='numeric'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        {/* // already have an account link */}
        {/* <Link href={'/sign-up'} replace asChild> */}
        {/*   <TouchableOpacity> */}
        {/*     <Text style={defaultStyles.textLink}>Already don't have an account? Sign up</Text> */}
        {/*   </TouchableOpacity> */}
        {/* </Link> */}
        {/* <View style={{ flex: 1 }} /> */}

        {/* // Sign in with phone button */}
        <TouchableOpacity style={[
          defaultStyles.pillButton,
          phoneNumber !== "" ? styles.enabled : styles.disabled,
          { marginBottom: 20 }
        ]} onPress={() => {
          onSignin(SignInType.Phone)
        }}
          disabled={phoneNumber === ""}
        >
          <Text style={defaultStyles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.dark }} />
          <View><Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text></View>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.dark }} />
        </View>

        {/* // Sign in with email button */}
        <TouchableOpacity style={[defaultStyles.pillButton, {
          flexDirection: 'row',
          gap: 16,
          marginTop: 20,
          backgroundColor: '#fff',
        }]}
          onPress={() => {
            onSignin(SignInType.Email);
          }}
        >
          <Ionicons name='mail' size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email</Text>
        </TouchableOpacity>

        {/* // Sign in with google button */}
        <TouchableOpacity style={[defaultStyles.pillButton, {
          flexDirection: 'row',
          gap: 16,
          marginTop: 20,
          backgroundColor: '#fff',
        }]}
          onPress={() => {
            onSignin(SignInType.Google);
          }}
        >
          <Ionicons name='logo-google' size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with Google</Text>
        </TouchableOpacity>

        {/* // Sign in with apple button */}
        <TouchableOpacity style={[defaultStyles.pillButton, {
          flexDirection: 'row',
          gap: 16,
          marginTop: 20,
          backgroundColor: '#fff',
        }]}
          onPress={() => {
            onSignin(SignInType.Apple);
          }}
        >
          <Ionicons name='logo-apple' size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with Apple</Text>
        </TouchableOpacity>

      </View >
    </KeyboardAvoidingView>
  )
}

// -----------------------------------------------------------
// export
// -----------------------------------------------------------
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 4
  },
  enabled: {
    backgroundColor: Colors.primary
  },
  disabled: {
    backgroundColor: Colors.primaryMuted
  }
})

// -----------------------------------------------------------
// export
// -----------------------------------------------------------
export default LoginPage;
