import EmisysNfcReader from './posapp_emisys/EmisysNfcReader';
import EmisysSystem from './posapp_emisys/EmisysSystem';
import EmisysPrinter from './posapp_emisys/EmisysPrinter';
import EmisysTerminal, {EmisysTerminalSaleStatus} from './posapp_emisys/EmisysTerminal';
import EmisysVivawallet, { EmisysVivawalletPosSaleStatus } from './posapp_emisys/EmisysVivawallet';
import EmisysVivawalletPos from './posapp_emisys/EmisysVivawalletPos';

import { EmisysVivawalletSaleStatus } from "./posapp_emisys/EmisysVivawallet";
export = emisys;

declare namespace emisys {
  /**
   * Global variable injected in the javascript code by posapp.
   *
   * It is only available when the code is running in posapp. Code running in a standard browser doesn't have
   * that global variable. Therefore, care must be taken to ensure it exists.
   */

  const nfcReader: EmisysNfcReader;
  const system: EmisysSystem;
  const printer: EmisysPrinter;
  const terminal: EmisysTerminal;
  const vivawallet: EmisysVivawallet;
  const vivawalletPos: EmisysVivawalletPos;

  export type EmisysVivawalletSaleStatusType = EmisysVivawalletSaleStatus;
  export type EmisysVivawalletPosSaleStatusType = EmisysVivawalletPosSaleStatus;
  export type EmisysTerminalSaleStatusType = EmisysTerminalSaleStatus;
}
