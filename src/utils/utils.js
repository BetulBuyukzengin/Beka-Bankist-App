import { format } from "date-fns";
import { differenceInDays } from "date-fns";

export const formatCurrency = (value) =>
  new Intl.NumberFormat("tr", { style: "currency", currency: "TRY" }).format(
    value
  );

export function formatIBAN(iban) {
  iban = iban.replace(/ /g, "").replace(/-/g, "");
  const formattedIBAN = iban.match(/.{1,4}/g).join(" ");
  return formattedIBAN;
}
export function formatBankAccountNumber(accountNumber) {
  accountNumber = accountNumber.replace(/ /g, "");
  const formattedAccountNumber = accountNumber.replace(
    /(.{4})(.{8})(.{4})/,
    "$1-$2-$3"
  );

  return formattedAccountNumber;
}
export function formatDate(date) {
  return format(date, "dd/MM/yyyy HH:mm:s");
}

export function calculateAndFormatLoan(loanAmount, interest, month) {
  return `${formatCurrency(
    (loanAmount * interest + Number(loanAmount)) / month
  )} x ${month}`;
}

export function generatePaymentMethod(method) {
  if (method === "housingRent") return "Housing Rent";
  if (method === "workplaceRent") return "Workplace Rent";
  if (method === "eCommercePayment") return "E-Commerce Payment";
}

export function calcAge(birthday) {
  return differenceInDays(new Date(), birthday) / 365;
}

export function generateRandomIBAN() {
  const bankCodes = ["TR"];
  const countryCode = bankCodes[Math.floor(Math.random() * bankCodes.length)];

  const trBankCodes = [
    "001",
    "002",
    "003",
    "004",
    "005",
    "006",
    "007",
    "008",
    "009",
    "010",
  ];
  const bankCode = trBankCodes[Math.floor(Math.random() * trBankCodes.length)];

  const accountNumber = Math.floor(
    1000000000000000 + Math.random() * 9000000000000000
  );

  const iban = countryCode + bankCode + accountNumber;

  return iban;
}

export function generateRandomBankAccountNumber() {
  const bankCodes = [
    "001",
    "002",
    "003",
    "004",
    "005",
    "006",
    "007",
    "008",
    "009",
    "010",
  ];
  const bankCode = bankCodes[Math.floor(Math.random() * bankCodes.length)];

  // Rastgele 10 haneli rakam üretme
  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  // Banka hesap numarasını formatlama
  const formattedAccountNumber = ("0000000000" + accountNumber).slice(-10); // 10 haneli olacak şekilde formatla

  return bankCode + formattedAccountNumber;
}

export function formatWord(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}

export function formatArrayWord(words) {
  const arrayWords = words.split(" ");
  return arrayWords
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
