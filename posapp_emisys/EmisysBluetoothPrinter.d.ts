/* eslint-disable no-unused-vars */

// https://github.com/CesarBalzer/Cordova-Plugin-BTPrinter

export default class EmisysBluetoothPrinter {
  /**
   *  Init Bluetooth printer
   */
  initPrinter();

  /**
   * Send command to Bluetooth printer
   */
  printPOSCommand(command: string): void;

  /**
   *  Print text with size and align configuration
   */
  printText(
      text: string,
      size: 'normal' | 'normalBold' | 'doubleHeight' | 'doubleWidth',
      align: 'left' | 'center' | 'right'
  ): void;
}
