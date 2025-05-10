import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCreateReview } from '../hooks/useCreateReview';
import { useNavigate } from 'react-router';

// 1. 定义 Yup 验证 schema
const ReviewSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required('Repository owner\'s username is required'),
  repositoryName: Yup.string()
    .required('Repository name is required'),
  rating: Yup.number()
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
  text: Yup.string().optional(), // 可选字段
});

// 2. 定义表单组件
const ReviewForm = () => {

  const [createReview] = useCreateReview();
  const navigate = useNavigate();
  
  const onSubmit = async (values) => {
      const { ownerName, repositoryName, rating, text} = values;

    //   console.log({ownerName, repositoryName, rating, text})
  
      try {
        const  repositoryId  = await createReview({ ownerName, repositoryName, rating, text });
        console.log(repositoryId,repositoryId)
        navigate(`/repo/${repositoryId}`);  
      } catch (e) {
        console.error(e);
      }
  };

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      validationSchema={ReviewSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.formContainer}>
          {/* Repository Owner */}
          <TextInput
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
            placeholder="Repository owner name"
            style={[
                styles.input,
                touched.ownerName && errors.ownerName ? styles.inputError : null,
              ]}
              autoCapitalize='none'
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}

          {/* Repository Name */}
          <TextInput
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
            placeholder="Repository name"
            style={[
                styles.input,
                touched.repositoryName && errors.repositoryName ? styles.inputError : null,
              ]}
              autoCapitalize='none'
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}

          {/* Rating */}
          <TextInput
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            keyboardType="numeric"
            placeholder="Rating between 0 and 100"
            style={[
                styles.input,
                touched.rating && errors.rating ? styles.inputError : null,
              ]}
          />
          {touched.rating && errors.rating && (
            <Text style={styles.errorText}>{errors.rating}</Text>
          )}

          {/* Review */}
          <TextInput
            style={[styles.input, styles.textArea]}
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
            placeholder="Write your review here..."
            multiline
            numberOfLines={4}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
             <Text style={styles.submitButtonText}>Create a Review</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

// 3. 样式定义
const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // 多行文本垂直居上
  },
  errorText: {
    color: '#d73a4a',
    fontSize: 12,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 3,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReviewForm;