/* eslint-disable no-unused-vars */

declare interface EmisysTerminalConnectCallback {
  (connected: boolean): void;
}

declare interface EmisysTerminalSaleCallback {
  (status: EmisysTerminalSaleStatus): void;
}

export declare interface EmisysTerminalSaleStatus {
  /**
   * True if the operation succeeded.
   */
  success: boolean;
  /**
   * Unique identification for the last sale transaction.
   */
  saleId?: string;
  /**
   * Ticket printed for the client.
   */
  clientTicket?: string;
  /**
   * Ticket printed for the merchant.
   */
  merchantTicket?: string;
  /**
   * Card brand name used by the customer to pay the purchase.
   */
  cardBrandName?: string;
  /**
   * TID of connected terminal.
   */
  terminalId: string;
  /**
   * Error code if the transaction failed. It is "terminal.operation." + code where the code
   * can be: "rejected", "technical_issue", "no_wifi", "timeout", "unknown_error_code"
   * See YomaniTerminal::decodeStatus().
   */
  errorMsg?: string;
  /**
   * Text message corresponding to TeminalStatus::incidentCode.
   */
  incidentMsg?: string;
  /**
   * Text message corresponding to TerminalStatus::rejectionCode.
   */
  rejectionMsg?: string;
  /**
   * Error code depending on the type of error.
   *
   * The most pertinent message from: incidentMsg, rejectionMsg, moreInfoMsg (not otherwise exposed as it was found
   * not to be relevant when incidentMsg or rejectionMsg are reported.
   *
   * It can be
   *    "terminal.incident." + numeric code,
   *    "terminal.rejection." + numeric code,
   *    "terminal.error." + numeric code.
   */
  infoMsg?: string;
}

export default class EmisysTerminal {
  getPort(): number;
  getIpList(): string[];
  setIdentification(name: string): boolean;
  setConnectCallback(callback: EmisysTerminalConnectCallback): boolean;
  isConnected(): boolean;
  sale(
    amount: number,
    saleId: number,
    callback: EmisysTerminalSaleCallback
  ): boolean;
  cancel(callback: EmisysTerminalSaleCallback): boolean;
  abort(): boolean;
}
