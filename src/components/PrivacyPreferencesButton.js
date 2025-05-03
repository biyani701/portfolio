import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

const PrivacyPreferencesButton = () => {
  const [klaroReady, setKlaroReady] = useState(false);

  useEffect(() => {
    // Check if Klaro is available and has the show method
    const checkKlaro = () => {
      if (window.klaro && typeof window.klaro.show === 'function') {
        setKlaroReady(true);
      }
    };

    // Initial check
    checkKlaro();

    // Set up an interval to check periodically
    const interval = setInterval(checkKlaro, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    console.log(window.klaro)
    if (window.klaro && typeof window.klaro.show === 'function') {
      try {
        window.klaro.show();
      } catch (error) {
        console.error('Error showing Klaro modal:', error);
      }
    } else {
      console.warn('Klaro is not properly initialized');
    }
  };

  return (
    <Button
      variant="outlined"
      color="inherit"
      onClick={handleClick}
      disabled={!klaroReady}
    >
      Manage Privacy Preferences
    </Button>
  );
};

export default PrivacyPreferencesButton;
