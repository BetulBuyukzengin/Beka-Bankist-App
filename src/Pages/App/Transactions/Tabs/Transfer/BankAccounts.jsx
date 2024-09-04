/* eslint-disable react/prop-types */
//! Custom radio yu reusable yap.
import { formatCurrency, formatWord } from "../../../../../utils/utils";
import { NavigateNext } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledTitleLabel = styled.label`
  margin-right: 0.5rem;
`;
const StyledH6 = styled.h6`
  text-align: start;
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
          <StyledH6>
            {`${formatWord(account.bankName)} - ${formatWord(
              account.bankBranch
            )}`}
          </StyledH6>
          <StyledTitleLabel>
            Kullanılabilir bakiye: {formatCurrency(account.balance)}
          </StyledTitleLabel>
        </div>
        <div>
          <NavigateNext />
        </div>
      </StyledCheckComponent>
    </>
  );
}
