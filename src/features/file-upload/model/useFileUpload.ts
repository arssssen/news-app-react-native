import { useCallback, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

type UseFileUploadResult = {
  status: UploadStatus;
  message: string | null;
  pickAndUploadFile: () => Promise<void>;
};

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useFileUpload(): UseFileUploadResult {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const pickAndUploadFile = useCallback(async () => {
    try {
      setStatus('idle');
      setMessage(null);

      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf', '*/*'],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        setMessage('File selection canceled.');
        return;
      }

      const selected = result.assets[0];
      setStatus('uploading');

      // Mock upload request placeholder.
      // Replace this with a real multipart API call when backend endpoint is ready.
      await wait(1200);

      setStatus('success');
      setMessage(`Uploaded: ${selected.name}`);
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error ? error.message : 'Failed to upload file.',
      );
    }
  }, []);

  return {
    status,
    message,
    pickAndUploadFile,
  };
}
