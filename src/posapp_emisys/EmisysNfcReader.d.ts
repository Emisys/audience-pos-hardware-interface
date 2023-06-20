/* eslint-disable no-unused-vars */

declare enum CardTypes {
  MIFAREONTE,
  ULTRALIGHT,
  TYPEA_SMART_CARD,
  MIFAREPLUS_L0,
  MIFAREPLUS_L1,
  MIFAREPLUS_L2,
  MIFAREPLUS_L3,
  MIFAREPLUS_L0S,
  TYPEB_SMART_CARD,
  SR176,
  SRIX4K,
  AT88F020,
  SRI512,
  ISO15693,
  SAM_1,
  SAM_2,
  SAM_3,
  SAM_4,
}

declare interface SectorMap {
  sector: number;
  /**
   * +1 if sector is encrypted; =0 if sector is not encrypted; -1 if error
   */
  status: number;
  nBlocks: number;
  controlBlock: number;
  encryptionKey: number[];
}

declare interface CheckCardContent {
  cardId: string;
  sectors: SectorContent[];
}

type SectorStatusNameType =
  | 'unknown_status'
  | 'encrypted_sector'
  | 'unencrypted_sector'
  | 'invalid_sector_num'
  | 'too_many_data'
  | 'no_key_for_sector'
  | 'not_our_key'
  | 'data_corrupted';

declare interface SectorContent {
  sector: number;
  content: number[];
  status: SectorStatusNameType;
  statusStr: string;
}

declare interface LastError {
  error: string;
  description: string;
}

declare interface LogMessage {
  id: number;
  uid: string;
  sector: number | null;
  message: string | null;
  date: Date;
}

declare interface EncryptionKey {
  id: number;
  uid: string;
  sector: number | null;
  keyA: string | null;
  status: string | null;
  date: Date;
}

export default class EmisysNfcReader {
  static readonly noLed: number;
  static readonly redLed: number;
  static readonly greenLed: number;
  static readonly blueLed: number;
  static readonly yellowLed: number;

  static readonly CardTypes: CardTypes;

  setLed(ledColor: number): boolean;
  ledOff(): boolean;

  /**
   * @param blinkColor Led color to blink.
   * @param repeat How many times to blink the LED, default is blink once (between 1 and 255 for MR800).
   * @param onTime Delay the LED must remain on in 100ms, default is 500ms (between 1 and 255 for MR800).
   * @param offTime Delay the LED must remain off in 100ms, default is 500ms (between 1 and 255 for MR800).
   * @param startColor Leds state before blinking starts, default is all off.
   * @param afterColor Leds state after blinking stops, default is all off.
   */
  blinkLed(
    blinkColor: number,
    repeat?: number,
    onTime?: number,
    offTime?: number,
    startColor?: number,
    afterColor?: number
  ): boolean;

  /**
   * @param repeat How many times to beep the buzzer, default is once (between 1 and 255 for MR800).
   * @param onTime
   * @param offTime
   */
  buzzer(repeat?: number, onTime?: number, offTime?: number): boolean;

  /**
   * @param text
   * @param row Row number starting from zero for top row.
   * @param column Column number starting from zero for left most column.
   * @param clear Clear screen before displaying the text, default is true.
   */
  flashText(
    text: string,
    row?: number,
    column?: number,
    clear?: boolean
  ): boolean;

  /**
   * @param mask Clear lines of text. The mask tells what line to clear. Default is to clear the whole screen.
   */
  clearText(mask?: number): boolean;

  /**
   * @param state Turn on or off the backlight. Default is to turn backlight on.
   * @param duration How long to turn backlight on in 100ms. Default is zero meaning leaves on for as long as MR800
   * can keep it on.
   */
  backlight(state?: boolean, duration?: number): boolean;

  /**
   * Read a card UID if one is currently seen by the NFC reader.
   * @param cardType Default is Mifare classic.
   * @returns The card UID or an empty string if no card is detected.
   */
  readCard(cardType?: CardTypes): string;

  readCardBlock(cardUid: string, block: number): number[];
  writeCardBlock(cardUid: string, block: number, data: number[]): boolean;

  writeCardUidBlock(cardUid: string, data: number[]): boolean;
  readValueBlock(cardUid: string, block: number): number;
  writeValueBlock(cardUid: string, block: number, value: number): boolean;
  decrementValueBlock(cardUid: string, block: number, step: number): boolean;

  haveSetLed(): boolean;
  haveBlinkLed(): boolean;
  haveReadCard(): boolean;

  /**
   * Set the encryption key used to derive access codes to read and write on the nfc card.
   * @param password
   * @param iterations Number of iterations for Argon2d. Default is 2.
   * @param memory Memory used by argon2d. Default is 10Mo.
   * @param threads Number of threads to use to encrypt the password with argon. Default is 4.
   */
  setEncryptionData(
    password: string,
    iterations?: number,
    memory?: number,
    threads?: number
  ): boolean;

  /**
   * Set key to encrypt NFC sectors.
   * @param cardUid
   * @param sector
   * @param key 6-byte key stored as an hex string.
   */
  setNfcKey(cardUid: string, sector: number, key: string): boolean;

  /**
   * Set the AES encryption key to use to encrypt data on the card
   * @param key 64-hex digit long encryption key
   */
  setAesKey(key: string): void;

  /**
   * Set HMAC verification signature.
   * @param key Any randomly secure string.
   */
  setHmacKey(key: string): void;

  lockCardSector(cardUid: string, sector: number): boolean;
  unlockCardSector(cardUid: string, sector: number): boolean;

  /**
   * Get an array explaining what was found in the sectors of the card.
   * @param cardUid
   */
  getCardSectorMap(cardUid: string): SectorMap[];

  initializeCardSectors(
    cardUid: string,
    sectorList: SectorMap[],
    randomData?: boolean
  ): void;

  /**
   * @deprecated
   * @param cardId
   * @param sectorList
   * @param randomData
   */
  randomizeCardSectors(cardId, sectorList, randomData);

  /**
   * @param cardType
   * @param sectors
   * @param size Number of bytes to read in each sector.
   */
  checkCardValidity(
    cardType: CardTypes,
    sectors: number[],
    size?: number
  ): CheckCardContent;

  /**
   * @param cardUid
   * @param sector
   * @param size Number of bytes to read. Default is 16.
   */
  readCardSector(cardUid: string, sector: number, size?: number): number[];
  writeCardSector(cardUid: string, sector: number, data: number[]): boolean;

  setSectorStatus(cardUid: string, sector: number, status: string);

  lastError(): LastError;
  logMessage(cardUid: string, sector: number | null, message: string): boolean;

  /**
   * @param limit Maximum number of messages to retrieve.
   */
  getLogMessageToSync(limit: number): LogMessage[];
  syncLogMessage(messageId: number, syncDate: Date): boolean;
  getKeyToSync(limit: number): EncryptionKey[];
  syncKey(keyId: number, syncDate: Date): boolean;
}
