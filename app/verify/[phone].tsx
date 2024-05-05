import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Colors from '@/constants/Colors';
const CELL_COUNT = 6;


const PhoneVerificationPage = () => {
  // Local state
  const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>();
  const [code, setCode] = useState('');
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();


  // Code Field
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code, setValue: setCode
  });


  useEffect(() => {
    if (code.length === 6) {
      // verify the code
      if (signin === 'true') {
        verifySignin();
      } else {
        verifyCode();
      }
    }
  }, [code]);


  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({ code });
      await setActive!({ session: signUp!.createdSessionId });

    } catch (error) {
      console.log('SignIn error:', JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === 'form_identifier_not_found') {
          Alert.alert('Error', error.errors[0].message);
        }
      }
    }

  };
  const verifySignin = async () => {

    try {
      await signIn!.attemptFirstFactor({ strategy: 'phone_code', code });
      await setActive!({ session: signIn!.createdSessionId });

    } catch (error) {
      console.log('SignIn error:', JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === 'form_identifier_not_found') {
          Alert.alert('Error', error.errors[0].message);
        }
      }
    }

  };


  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>Code sent to {phone} unless you already have an account</Text>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({ android: "sms-otp", default: "one-time-code" }) as "sms-otp" | "one-time-code"}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
            {index === 2 ? <View key={`separator-${index}`} style={styles.separator} /> : null}
          </Fragment>
        )}
      />

      <Link href={'/login'} replace asChild>
        <TouchableOpacity>
          <Text style={[defaultStyles.textLink]}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}


const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: 'center'
  }
});



export default PhoneVerificationPage
