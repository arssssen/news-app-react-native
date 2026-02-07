import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useFileUpload } from '../model/useFileUpload';

export function FileUploadSection() {
  const { status, message, pickAndUploadFile } = useFileUpload();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Upload</Text>
      <Pressable style={styles.button} onPress={pickAndUploadFile}>
        <Text style={styles.buttonLabel}>
          {status === 'uploading' ? 'Uploading...' : 'Pick and Upload File'}
        </Text>
      </Pressable>
      {message ? (
        <Text style={[styles.message, status === 'error' && styles.errorMessage]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#111',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  message: {
    marginTop: 6,
    fontSize: 13,
    color: '#3b3b3b',
  },
  errorMessage: {
    color: '#b00020',
  },
});
