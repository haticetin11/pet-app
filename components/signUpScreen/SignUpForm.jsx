import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { app } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Auth kütüphanesinden import ediliyor
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
const SignUpForm = ({ navigation }) => {
  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username: Yup.string().required().min(2, 'A username is required'),
    password: Yup.string().required().min(6, 'Your password has to have at least 6 characters')
  });
  const [loading, setLoading] = useState(false);

  const register = async (values) => {
    const { email, password, username } = values;
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth,email,password, username); // Kullanıcı adı kaldırıldı
      console.log(response);
      alert('Register Successful!');
    } catch (error) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={values => {
          console.log(values);
          register(values)
          navigation.navigate('HomeScreen');
        }}
        validationSchema={SignUpFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View style={[styles.inputField,
            {
              borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
            }
            ]}>
              <TextInput
                placeholderTextColor='gray'
                placeholder='Email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                color='black'
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View style={[styles.inputField,
            {
              borderColor: values.username.length > 2 ? '#ccc' : 'red'
            }
            ]}>
              <TextInput
                placeholderTextColor='gray'
                placeholder='Username'
                autoCapitalize='none'
                color='black'
                autoFocus={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>
            <View style={[styles.inputField,
            {
              borderColor: values.password.length > 6 ? '#ccc' : 'red'
            }
            ]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>

            <Pressable
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text style={styles.textColor}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.textColor}>Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80
  },
  inputField: {
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 10,
    padding: 16,
  },
  button: isValid => ({
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
    marginTop: 50
  }),
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50
  },
  textColor: {
    color: 'black'
  }
});

export default SignUpForm;
