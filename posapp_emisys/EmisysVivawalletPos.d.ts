export default class EmisysVivawalletPos {
  startSale(clientTransactionId: string, amount: number): void;
  startSaleV2(url: string): void;
  getTransactionDetails(clientTransactionId: string, terminalId: string): void;
  getTransactionDetailsV2(url: string): void;
  pollingVivawalletResult(
    callback: (result: any) => void,
    number: number
  ): void;
  startPosActivation(clientId : string, secret: string): void;
}
