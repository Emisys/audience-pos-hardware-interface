export default class EmisysLaser {
  /**
   * Init laser listener
   */
  initBarcodeScannedListener(): void;

  /**
   * Get scanned barcode to display balance
   */
  getBarcodeScannedBalance(): string;

  /**
   * Get scanned barcode for cashless payment
   */
  getBarcodeScannedPayment(): string;
}