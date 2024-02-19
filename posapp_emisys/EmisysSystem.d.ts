/* eslint-disable no-unused-vars */
import EmisysSystemComputer from './EmisysSystemComputer';

type BatteryLevelType = 'low' | 'high' | 'critical';

declare interface BatteryStatus {
  /**
   * Is device connected to power plug?
   */
  connected?: boolean;

  /**
   * Is device charging?
   */
  charging?: boolean;

  level?: BatteryLevelType;

  /**
   * Percentage of battery charge.
   */
  percent?: number;

  /**
   * Estimated time left until battery is depleted, in seconds.
   */
  lifeTime?: number;
}

export default class EmisysSystem {
  version(): string;

  /**
   * @deprecated Superseded with computer.getComputerName()
   * Get the computer name. It can possibly be overridden from the command line to pass one computer as another.
   */
  getComputerName(): string | null;

  /**
   * @deprecated Superseded with computer.getMacAddress()
   */
  getMacAddress(): string | null;

  /**
   * @deprecated Superseded with computer.getIpAddress()
   */
  getIpAddress(): string | null;
  computer?: EmisysSystemComputer;

  /**
   * Get real computer name as provided by the operating system.
   */
  getComputerRealName(): string;

  /**
   * Tell if the local database is available.
   * On windows, a false return value usually means xampp failed to start or is not installed.
   */
  isDatabaseAvailable(): boolean;

  reloadPage(): boolean;

  /**
   * Start a log entry for an ajax request. The log entry is typically stored into the local database. The purpose is
   * to have access to the history of the ajax calls, the time it tooks for the server to answer and the response code.
   * @param url
   * @param accessType A channel number to distinguish main sequence of the app (0) from any other request
   * such as retrieving last sales or other statistics. The main sequence is channel 0. It correspond to requests
   * that are always issued as part of the selling process.
   */
  writeAjaxStart(url: string, accessType: number): string | null;

  /**
   * Update log entry with the elapsed time, status code and status text of the ajax query.
   * @param ajaxId The ID returned by writeAjaxStart().
   * @param responseTime
   * @param statusCode
   * @param statusText
   */
  writeAjaxStatus(
    ajaxId: string | null,
    responseTime: number | null,
    statusCode: number | null,
    statusText: string | null
  ): boolean;

  /**
   * Write some payload to a file that is ultimately sent to zabbix by a script running on the computer.
   * @param content
   */
  writeZabbixFile(content: string): boolean;

  battery(): BatteryStatus;

  /**
   * Flag only available in the web browser emulation module.
   * It can be used to disable time consuming animations when running on a slow computer having a hard time
   * coping with the web page.
   */
  simulation?: boolean;

  /**
   * Put or remove android kiosk mode depending on the param.
   * @param isActive {Boolean}
   */
  setKioskMode(isActive: boolean);
}
