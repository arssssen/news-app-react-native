import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

import { useFileDownload } from '../model/useFileDownload';

const DEFAULT_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export function FileDownloadSection() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const { status, progress, message, startDownload } = useFileDownload();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Download</Text>
      <TextInput
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholder="https://example.com/file.pdf"
        placeholderTextColor="#888"
      />
      <Pressable
        style={styles.button}
        onPress={() => void startDownload(url)}
        disabled={status === 'downloading'}
      >
        <Text style={styles.buttonLabel}>
          {status === 'downloading' ? 'Downloading...' : 'Download File'}
        </Text>
      </Pressable>
      {status === 'downloading' ? (
        <Text style={styles.message}>Progress: {(progress * 100).toFixed(0)}%</Text>
      ) : null}
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
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: '#d5d5d5',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
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
