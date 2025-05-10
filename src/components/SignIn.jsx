import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';
import { useNavigate } from 'react-router';

// 样式定义
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#d73a4a',
    fontSize: 12,
    marginBottom: 12,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  signInButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// 使用 Yup 定义验证规则
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log('Authentication successful:', data);
      navigate('/repositories');  
    } catch (e) {
      console.error('Authentication failed:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema} // 使用 Yup schema 进行验证
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <>
            {/* Username Field */}
            <TextInput
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Username"
              style={[
                styles.input,
                touched.username && errors.username ? styles.inputError : null,
              ]}
              autoCapitalize='none'
            />
            {touched.username && errors.username && (
              <RNText style={styles.errorText}>{errors.username}</RNText>
            )}

            {/* Password Field */}
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Password"
              secureTextEntry
              style={[
                styles.input,
                touched.password && errors.password ? styles.inputError : null,
              ]}
            />
            {touched.password && errors.password && (
              <RNText style={styles.errorText}>{errors.password}</RNText>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
              <RNText style={styles.signInButtonText}>Sign In</RNText>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;