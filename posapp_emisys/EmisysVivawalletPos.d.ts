export default class EmisysVivawalletPos {
  startSale(clientTransactionId: string, amount: number): void;
  getTransactionDetails(clientTransactionId: string, terminalId: string): void;
  pollingVivawalletResult(
    callback: (result: any) => void,
    number: number
  ): void;
}
