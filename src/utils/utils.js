import { format } from "date-fns";
import { differenceInDays } from "date-fns";

export const formatCurrency = (value) =>
  new Intl.NumberFormat("tr", { style: "currency", currency: "TRY" }).format(
    value
  );

export function formatIBAN(iban) {
  if (!iban) return;
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
  const countryCode = "TR";
  const checksum = Math.floor(10 + Math.random() * 90).toString(); // 10-99 arası rastgele iki haneli sayı
  const bankCode = Math.floor(100 + Math.random() * 900)
    .toString()
    .padStart(4, "0"); // 4 haneli banka kodu
  const branchCode = Math.floor(1000 + Math.random() * 9000).toString(); // 4 haneli şube kodu
  const accountNumber = Math.floor(Math.random() * 1e13)
    .toString()
    .padStart(14, "0"); // 16 haneli hesap numarası

  return `${countryCode}${checksum}${bankCode}${branchCode}${accountNumber}`;
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
export function calculateAvailableMonthlyPayment(income, expense) {
  return +income - +expense;
}
export function calculateLoanAmount(monthlyPayment, paymentPeriod) {
  if (!paymentPeriod) return;
  const { value, interest } = paymentPeriod;
  const months = value * 12;
  const loanWithoutInterest = monthlyPayment * 0.8 * months;
  // const interestAmount = monthlyPayment * 0.8 * months * interest;
  // return loanWithoutInterest + interestAmount;
  return loanWithoutInterest;
}
export const convertToBoolean = (str) => {
  if (str === "true") return true;
  if (str === "false") return false;
  return null;
};
