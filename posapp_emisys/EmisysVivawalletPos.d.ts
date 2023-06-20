export default class EmisysVivawalletPos {
  startSale(amount: number, clientTransactionId: string): void;
  pollingVivawalletResult(
    callback: (result: any) => void,
    number: number
  ): void;
}
