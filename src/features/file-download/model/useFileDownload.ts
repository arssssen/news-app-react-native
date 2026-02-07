import { useCallback, useRef, useState } from 'react';
import * as FileSystemLegacy from 'expo-file-system/legacy';

type DownloadStatus = 'idle' | 'downloading' | 'success' | 'error';

type UseFileDownloadResult = {
  status: DownloadStatus;
  progress: number;
  message: string | null;
  startDownload: (url: string) => Promise<void>;
};

export function useFileDownload(): UseFileDownloadResult {
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const taskRef = useRef<FileSystemLegacy.DownloadResumable | null>(null);

  const startDownload = useCallback(async (url: string) => {
    if (!url.trim()) {
      setStatus('error');
      setMessage('Download URL is required.');
      return;
    }

    try {
      setStatus('downloading');
      setProgress(0);
      setMessage(null);

      const targetDir = FileSystemLegacy.documentDirectory;
      if (!targetDir) {
        throw new Error('App storage is unavailable on this device.');
      }

      const filename = `download-${Date.now()}.bin`;
      const targetPath = `${targetDir}${filename}`;

      const downloadTask = FileSystemLegacy.createDownloadResumable(
        url,
        targetPath,
        {},
        (downloadProgress) => {
          const { totalBytesExpectedToWrite, totalBytesWritten } = downloadProgress;
          if (totalBytesExpectedToWrite <= 0) {
            return;
          }
          setProgress(totalBytesWritten / totalBytesExpectedToWrite);
        },
      );

      taskRef.current = downloadTask;
      const result = await downloadTask.downloadAsync();

      if (!result?.uri) {
        throw new Error('Download did not return a file URI.');
      }

      setStatus('success');
      setProgress(1);
      setMessage(`Downloaded to: ${result.uri}`);
    } catch (error) {
      const rawMessage =
        error instanceof Error ? error.message : 'Failed to download file.';
      const normalizedMessage = /network/i.test(rawMessage)
        ? 'Network error while downloading file.'
        : rawMessage;

      setStatus('error');
      setMessage(normalizedMessage);
    } finally {
      taskRef.current = null;
    }
  }, []);

  return {
    status,
    progress,
    message,
    startDownload,
  };
}
