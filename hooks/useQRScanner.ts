import { useState } from 'react';

export function useQRScanner() {
  const [scanned, setScanned] = useState(false);

  const handleScanComplete = () => {
    setScanned(true);
    setTimeout(() => setScanned(false), 3000);
  };

  const resetScanner = () => {
    setScanned(false);
  };

  return {
    scanned,
    handleScanComplete,
    resetScanner
  };
}
