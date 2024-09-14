/* eslint-disable react/prop-types */
//! Custom radio yu reusable yap.
import { formatCurrency, formatWord } from "../../../../../utils/utils";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledH6 = styled.h6`
  text-align: start;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  @media (max-width: 48em) {
    font-size: 0.7rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.6rem;
  }
`;
const StyledH5 = styled.h5`
  text-align: start;
  font-size: 1.1rem;
  color: var(--color-text);
  @media (max-width: 48em) {
    font-size: 0.7rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.6rem;
  }
`;
const StyledCheckComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7% 9%;
  border: 1px solid var(--color-border-2);
`;

//! User's bank accounts
export default function BankAccounts({ account, border, monthlyPayment }) {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  const {
    formState: { errors },
  } = useFormContext();

  const isBalanceNotEnough =
    account?.id === selectedAccount?.id &&
    monthlyPayment?.totalAmountToPay > selectedAccount?.balance;

  return (
    <>
      <StyledCheckComponent
        style={{
          width: "100%",
          justifyContent: "start",
          backgroundColor:
            account?.accountNumber === selectedAccount?.accountNumber &&
            "var(--color-text-2)",

          border:
            border === "standard"
              ? "none"
              : !selectedAccount && errors?.selectedAccount
              ? "1px solid var(--color-error)"
              : selectedAccount?.accountNumber === account?.accountNumber &&
                ((status === "Deposit" &&
                  selectedAccount.remainingDepositLimit === 0) ||
                  (status === "Withdraw" &&
                    selectedAccount.remainingWithdrawLimit === 0) ||
                  (status === "Transfer" &&
                    selectedAccount.remainingTransferLimit === 0) ||
                  (selectedAccount.balance === 0 && errors?.selectedAccount))
              ? "1px solid var(--color-error)"
              : isBalanceNotEnough
              ? "1px solid var(--color-error)"
              : "none",
        }}
      >
        <div>
          <StyledH5>
            {`${formatWord(account.bankName)} - ${formatWord(
              account.bankBranch
            )}`}
          </StyledH5>
          <StyledH6>
            Kullanılabilir bakiye: {formatCurrency(account.balance)}
          </StyledH6>
        </div>
      </StyledCheckComponent>
    </>
  );
}
