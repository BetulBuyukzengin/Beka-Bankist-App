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
