import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

// -----------------------------------------------------------
// Render
// -----------------------------------------------------------
const SignUpPage = () => {
  // local state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+503');

  // keyboard offset control 
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

  // signun function
  const onSignup = async () => { }



  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>Enter your phone number. We will send you a confirmation code there</Text>
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
        <Link href={'/login'} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </Link>


        <View style={{ flex: 1 }} />
        <TouchableOpacity style={[
          defaultStyles.pillButton,
          phoneNumber !== "" ? styles.enabled : styles.disabled,
          { marginBottom: 20 }
        ]} onPress={onSignup}>
          <Text style={defaultStyles.buttonText}>Sign up</Text>
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
export default SignUpPage
