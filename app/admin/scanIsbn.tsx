import { CameraView, useCameraPermissions, BarcodeScanningResult, BarcodeType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCANNER_SIZE = width * 0.7; // Adjust as needed, e.g., 70% of screen width

export default function BarcodeScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Process the scanned data here
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
              "qr",
              "ean13",
              "code128",
          ],
        }}
      />

      {/* Overlay for the scanner */}
      <View style={styles.overlay}>
        {/* Top section of the overlay */}
        <View style={styles.overlayTop} />

        {/* Middle section with the transparent hole */}
        <View style={styles.overlayMiddle}>
          {/* Left section */}
          <View style={styles.overlayLeft} />
          {/* The actual transparent scanning area */}
          <View style={styles.scannerFrame} />
          {/* Right section */}
          <View style={styles.overlayRight} />
        </View>

        {/* Bottom section of the overlay */}
        <View style={styles.overlayBottom}>
          <Text style={styles.scanText}>
            Align QR code or barcode within the frame
          </Text>
          {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} color="#CBC3E3" />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Sections for the semi-transparent overlay
  overlayTop: {
    flex: 1, // Takes up remaining space at the top
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black
  },
  overlayMiddle: {
    flexDirection: 'row',
    width: '100%',
    height: SCANNER_SIZE, // Fixed height for the scanning area
  },
  overlayLeft: {
    flex: 1, // Takes up remaining space on the left
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scannerFrame: {
    width: SCANNER_SIZE,
    height: SCANNER_SIZE,
    borderColor: 'rgba(255, 255, 255, 0.5)', // Border for the scanning area
    borderWidth: 2,
    borderRadius: 10, // Rounded corners for the frame
    backgroundColor: 'transparent', // Crucial for the "hole"
  },
  overlayRight: {
    flex: 1, // Takes up remaining space on the right
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayBottom: {
    flex: 1, // Takes up remaining space at the bottom
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});