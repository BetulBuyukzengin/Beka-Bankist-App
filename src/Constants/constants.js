export const minAmountToSend = 10;
export const starterBalance = 0;
export const dailyTransferLimit = 500000;
export const dailyDepositLimit = 50000;
export const dailyWithdrawLimit = 50000;
export const maxIbanLength = 32; // with spaces
export const maxAccountNumberLength = 16; // with spaces
export const transferPrice = 2; // For week days

export const identificationNumberCharacter = 11;
export const interestAmountConst = 5;
export const hourInterval = 10800000; // every 3 hours
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const addressRegex =
  /^(?<il>[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+)\s+(?<ilce>[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+)\s+(?<mahalle>[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+)\s*[mM]ah\.\s*(?<sokak>[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+)\s*[sS]ok\.\s*[nN]o\s*:\s*(?<daire>[0-9]+)$/;
