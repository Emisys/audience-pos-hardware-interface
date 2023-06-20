/* eslint-disable no-unused-vars */

interface EmisysVivwalletSaleCallback {
  (status: EmisysVivawalletSaleStatus): void;
}

export interface EmisysVivawalletSaleStatus {
  /**
   * True if the operation succeeded.
   */
  success: boolean;
  /**
   * Unique identification for the last sale transaction.
   */
  saleId?: number;
  /**
   * Masket card number such as 479275******9999.
   */
  cardNumber?: string;
  /**
   * Card brand name used by the customer to pay the purchase.
   */
  cardBrandName?: string;
  /**
   * TID of connected terminal.
   */
  terminalId: string;
  /**
   * Payment authorization code (ex: 690882).
   */
  authorizationCode: string;
  /**
   * Six digits System Trace Audit Number issued by the cardholder's bank.
   */
  stanNumber: string;
  /**
   * Primary Account Number to be printed on the merchant ticket (ex: 629914XXXXXXXXX6770).
   */
  panMerchantNumber: string;
  /**
   * Primary Account Number to be printed on the client ticket.
   */
  panClientNumber: string;
  /**
   * Text to print on the receipt if not empty.
   */
  cardHolderText: string;
  /**
   * Text to print on the receipt if not empty.
   */
  transactionReceiptAcquirerZone: string;
  /**
   * Numerical code returned by the terminal in case of rejection of the payment.
   * https://developer.vivawallet.com/apis-for-point-of-sale/card-terminals/vivawallet-api-cl/#failure-reasons-and-iso-codes
   */
  rejectionCode: string;
  /**
   * Text message returned by the terminal in case of rejection of the payment (in the language of the terminal).
   */
  rejectionMsg: string;
  /**
   * Error code if the transaction failed.
   */
  errorMsg?: string;
  /**
   * Additional error code in case of failure.
   */
  moreInfoMsg?: string;
  /**
   * Raw message received from the terminal.
   */
  rawTerminalResponse: string;
  /**
   * Additional error code in case of failure.
   */
  moreErrorMsg?: string;
}

export interface EmisysVivawalletPosSaleStatus {
  /**
   * The status of the transaction.
   */
  status: string;
  /**
   * The amount in cents without any decimal digits.
   */
  amount?: string;
  /**
   * The client transaction ID
   */
  clientTransactionId?: string;
  /**
   * The order code.
   */
  orderCode?: string;
  /**
   * The payment method to be presented first to the user.
   */
  paymentMethod?: string;
  /**
   * The payment key to retrieve payment in webhook.
   */
  paymentKey?: string;
  /**
   * A 6-digit number indicating the transaction's STAN number.
   */
  referenceNumber?: string;
  /**
   * The Retrieval Reference Number of the transaction RRN.
   */
  rrn?: string;
  /**
   * 10-digit integer.
   */
  shortOrderCode?: string;
  /**
   * The transaction date in ISO 8601 format.
   */
  transactionDate?: string;
  /**
   * A unique identifier for the transaction.
   */
  transactionId?: string;
  /**
   * The verification method used.
   */
  verificationMethod?: string;
  /**
   * A 12 character string indicating the terminal's TID number.
   */
  tid?: string;
  /**
   * Masket card number such as 479275******9999.
   */
  accountNumber?: string;
  /**
   * Payment authorization code (ex: 690882).
   */
  authorisationCode?: string;
  /**
   * A string containing information about the transaction status.
   */
  message: string;
}

interface EmisysVivawalletAbordCallback {
  (): void;
}

export default class EmisysVivawallet {
  setPort(port: number): boolean;

  getPort(): number;

  setHost(host: string): boolean;

  getHost(): string;

  sale(
    amount: number,
    saleId: number,
    identification: string,
    callback: EmisysVivwalletSaleCallback
  ): boolean;

  refund(
    refNum: number,
    saleId: number,
    identification: string,
    callback: EmisysVivwalletSaleCallback,
    amount: number
  ): boolean;

  abort(callback: EmisysVivawalletAbordCallback);
}
