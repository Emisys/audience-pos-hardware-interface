/* eslint-disable no-unused-vars */

interface EmisysStartPageResponse {
  pageWidth: number;
  pageHeight: number;
  paperWidth: number;
  paperHeight: number;
  scaleX: number;
  scaleY: number;
}

interface ServerPrintCommand {
  type: string;
  color: string;
  background?: string;
  size: number;
  weight: number;
  dir: number;
  name: string;
  box: string;
  align?: string;
  text: string;
  image: string;
  thickness: string;
  action: string;
  x0: number;
  y0: string;
  ecl: number;
}

export default class EmisysPrinter {
  /**
   * @param [printer] Printer number to configure. Default is printer 0.
   */
  configurePrinter(printer?: number): boolean;

  /**
   * @param [printer] Printer number on which to print the page. Default is printer 0.
   */
  startPage(printer?: number): EmisysStartPageResponse | boolean;
  printPage(): boolean;
  abortPage(): boolean;

  /**
   * @param [size] Default is 10pt.
   * @param [weight] Weight of the font. 400 = normal, 900 = bold.
   * @param [direction] Angle in 1/10th of degree. 0 is horizontal.
   * @param [name] It can be left empty to use the default printer font.
   */
  setFont(
    size?: number,
    weight?: number,
    direction?: number,
    name?: string
  ): boolean;

  /**
   * @param x0
   * @param y0
   * @param x1
   * @param y1
   * @param text It can be left empty to use the default printer font.
   * @param [align] L or empty for Left align, C or R. Default is left align.
   */
  printText(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    text: string,
    align?: string
  ): boolean;

  /**
   * @param x0
   * @param y0
   * @param x1
   * @param y1
   * @param image Base 64 encode bmp image to print.
   */
  printImage(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    image: number[]
  ): boolean;

  /**
   * @param x0
   * @param y0
   * @param x1
   * @param y1
   * @param [thickness] Default to 1px thickness.
   */
  printLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    thickness?: number
  ): boolean;

  setColor(foreground: number, background?: number): boolean;

  /**
   * @param verbose Log extra info about word wrapping. Used to debug word wrapping. Do not use in production.
   */
  setVerboseWordWrap(verbose: boolean): boolean;

  /**
   * @param text Escape sequence to send.
   */
  escape(text: string): boolean;

  /**
   * @param x0
   * @param y0
   * @param size
   * @param text
   * @param [errorCorrectionLevel] Default to minimum correction and smaller QR code density.
   */
  printQrCode(
    x0: number,
    y0: number,
    size: number,
    text: string,
    errorCorrectionLevel?: number
  ): boolean;

  /**
   * Store server print command information
   * @param commands
   */
  setCommands(commands: ServerPrintCommand): void;
}
