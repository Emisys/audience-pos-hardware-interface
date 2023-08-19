declare interface LogsModel {
  dateTime: Date;
  type: 'info'|'warning'|'error';
  message: string;
}

export default class EmisysLogsManager {
  /**
   * Add info message to logs
   * @param message
   */
  addInfo(message: string,): void;

  /**
   * Add warning message to logs
   * @param message
   */
  addWarning(message: string,): void;

  /**
   * Add error message to logs
   * @param message
   */
  addError(message: string,): void;

  /**
   * Return logs array
   * @return LogsModel[]
   */
  getLogs(): LogsModel[];
}
