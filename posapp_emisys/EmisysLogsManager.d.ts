declare interface LogsModel {
  dateTime: string;
  type: 'info'|'warning'|'error';
  message: string;
  extra?: unknown;
}

export default class EmisysLogsManager {
  /**
   * Add info message to logs
   * @param message
   * @param extra
   */
  addInfo(message: string, extra?:unknown): void;

  /**
   * Add warning message to logs
   * @param message
   * @param extra
   */
  addWarning(message: string, extra?:unknown): void;

  /**
   * Add error message to logs
   * @param message
   * @param extra
   */
  addError(message: string, extra?:unknown): void;

  /**
   * Return logs LogsModel[]
   * @return LogsModel[]
   */
  getLogs(): LogsModel[];
}
