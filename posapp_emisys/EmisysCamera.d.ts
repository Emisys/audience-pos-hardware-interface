export default class EmisysCamera {
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
