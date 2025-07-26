export default class EmisysCamera {
  /**
   * Is the device equiped with a barcode scanner?
   * Note that this is the react-native camera. The webview may still offer its
   * own navigator.mediaDevices.enumerateDevices().
   */
  hasBarcodeScanner(): boolean;

  /**
   * Open barcode scanner
   */
  openBarcodeScanner(): void;

  /**
   * Open barcode scanner
   */
  closeBarcodeScanner(): void;

  /**
   * Get barcode scanned
   */
  getBarcodeScanned(): string;
}
