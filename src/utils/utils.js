import {
  differenceInDays,
  format,
  differenceInMilliseconds,
  addDays,
  addMonths,
} from "date-fns";

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
  // return format(date, "MM/dd/yyyy");
  return format(date, "dd/MM/yyyy");

  // return format(date, "MM/dd/yyyy HH:mm:ss");
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
  return word?.slice(0, 1).toUpperCase() + word?.slice(1).toLowerCase();
}

export function formatArrayWord(words) {
  const arrayWords = words?.split(" ");
  return arrayWords
    ?.map(
      (word) => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase()
    )
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
  return loanWithoutInterest;
}
export const convertToBoolean = (str) => {
  if (str === "true") return true;
  if (str === "false") return false;
  return null;
};

export const showDailyLimitMessage = (status, time) => {
  return `Daily ${status} limit is surpassed, please try again after ${time}`;
};

export function calcRemainingLimitResetTime() {
  // Kullanıcının şu anki saatini al
  const now = new Date();

  // Gece yarısını belirle (bugünkü gece yarısı)
  let midnight = new Date();
  midnight.setHours(0, 0, 0, 0);

  // Eğer şuanki saat gece yarısından sonra ise, bir sonraki günün gece yarısını ayarla
  if (now > midnight) {
    midnight = addDays(midnight, 1);
  }

  // İki tarih arasındaki farkı milisaniye cinsinden hesapla
  const diffInMs = differenceInMilliseconds(midnight, now);

  // Milisaniyeden saat, dakika ve saniyeye çevirme
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const hours = Math.floor(diffInSeconds / 3600).toString();
  const minutes = Math.floor((diffInSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (diffInSeconds % 60).toString().padStart(2, "0");

  return `${hours} hours ${minutes} minutes ${seconds} seconds`;
}

export function calcNextMonth(date, numberMonth) {
  return addMonths(date, numberMonth);
}
export function calcNextDay(date, numberDay) {
  return addDays(date, numberDay);
}
export function areAllValuesDifferentThanNull(obj) {
  return Object.values(obj).every((value) => value === null);
}

export function findMostFrequent(arr) {
  const frequencyMap = {};
  //! Set frequency and increase item value
  arr.forEach((item) => {
    if (frequencyMap[item]) {
      frequencyMap[item]++;
    } else {
      frequencyMap[item] = 1;
    }
  });

  let mostFrequent = null;
  let maxCount = 0;

  //! Find the most repeated value
  for (const item in frequencyMap) {
    if (frequencyMap[item] > maxCount) {
      maxCount = frequencyMap[item];
      mostFrequent = item;
    }
  }

  return mostFrequent;
}

export function generateTooltipTitles(
  isInformationsCompleted,
  accountsLength,
  field
) {
  if (field === "Accounts") {
    return !isInformationsCompleted
      ? "Complete your personal information before starting"
      : !accountsLength
      ? "Create Account"
      : "Accounts";
  }
  if (field === "Movements") {
    return !isInformationsCompleted
      ? "Complete your personal information before starting"
      : "Movements";
  }
  if (field === "Transactions") {
    return !isInformationsCompleted
      ? "Complete your personal information before starting"
      : !accountsLength
      ? "Create a bank account before using transactions"
      : "Transactions";
  }
  if (field === "Settings") {
    return !isInformationsCompleted
      ? "Complete your personal information before starting"
      : "Settings";
  }
}

export function generatePrimarySidebarTexts(accountsLength, field) {
  if (field === "Accounts") {
    return !accountsLength ? "Create Account" : "Accounts";
  }
  if (field === "Movements") {
    return "Movements";
  }
  if (field === "Transactions") {
    return "Transactions";
  }
  if (field === "Settings") {
    return "Settings";
  }
}
