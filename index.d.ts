import EmisysNfcReader from './posapp_emisys/EmisysNfcReader';
import EmisysSystem from './posapp_emisys/EmisysSystem';
import EmisysPrinter from './posapp_emisys/EmisysPrinter';
import EmisysTerminal from './posapp_emisys/EmisysTerminal';
import EmisysVivawallet from './posapp_emisys/EmisysVivawallet';
import EmisysVivawalletPos from './posapp_emisys/EmisysVivawalletPos';

declare namespace emisys {
  /**
   * Global variable injected in the javascript code by posapp.
   *
   * It is only available when the code is running in posapp. Code running in a standard browser doesn't have
   * that global variable. Therefore, care must be taken to ensure it exists.
   */

  export const nfcReader: EmisysNfcReader;
  export const system: EmisysSystem;
  export const printer: EmisysPrinter;
  export const terminal: EmisysTerminal;
  export const vivawallet: EmisysVivawallet;
  export const vivawalletPos: EmisysVivawalletPos;
}

export default emisys;
