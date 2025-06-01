/* eslint-disable no-unused-vars */

export enum CardTypes {
  MIFAREONTE = 0x0000,
  TYPEA_SMART_CARD = 0x0100,
  ULTRALIGHT = 0x0200,
  MIFAREPLUS_L0 = 0x0300,
  MIFAREPLUS_L1 = 0x0301,
  MIFAREPLUS_L2 = 0x0302,
  MIFAREPLUS_L3 = 0x0303,
  MIFAREPLUS_L0S = 0x0304,
  TYPEB_SMART_CARD= 0x2000,
  SR176 = 0x2100,
  SRIX4K = 0x2200,
  AT88F020 = 0x2300,
  SRI512 = 0x2200,
  ISO15693 = 0x4000,
  SAM_1 = 0x6000,
  SAM_2 = 0x6001,
  SAM_3 = 0x6002,
  SAM_4 = 0x6003,
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

 export interface EmisysNfcReader {
    noLed: number;
    redLed: number;
    greenLed: number;
    blueLed: number;
    yellowLed: number;

    CardTypes: CardTypes;

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
     * @param memory Memory used by argon2d. Default is 10MB.
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

    /**
     * Display success image on screen (Telpo M8 mainly)
     */
    showPaymentSuccess();

    /**
     * Display error image on screen (Telpo M8 mainly)
     */
    showPaymentError();
  }
