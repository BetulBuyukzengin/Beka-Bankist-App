/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { NavigateNext } from "@mui/icons-material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useGetAccounts } from "../../services/accountServices";
import { formatCurrency, formatWord } from "../../utils/utils";
import Loader from "../Loader/Loader";
import { useFormContext } from "react-hook-form";

const StyledH6 = styled.h6`
  text-align: start;
`;
const StyledTitleLabel = styled.label`
  margin-right: 0.5rem;
`;

const StyledAccountCheckComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7% 9%;
  border: 1px solid var(--color-border-2);
`;

function AccountCheckComp({ account, border, monthlyPayment }) {
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
      <StyledAccountCheckComponent
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
      </StyledAccountCheckComponent>
    </>
  );
}

export default function CustomRadio({
  register,
  onChange,
  value,
  border,
  onClick,
  monthlyPayment,
}) {
  const { isLoading, accounts } = useGetAccounts();

  if (isLoading) return <Loader />;
  return (
    <RadioGroup
      aria-labelledby="selected-account-aria-label"
      name="selected-account-radio-group"
      value={value}
      onChange={onChange}
      onClick={onClick}
      sx={{
        display: "flex",
        gap: "1rem",
        cursor: "default",
      }}
    >
      {accounts.map((account) => (
        <FormControlLabel
          key={account.accountNumber}
          sx={{
            marginLeft: "0",
            marginRight: "0",
            justifyContent: "center",
          }}
          {...register}
          control={<Radio />}
          value={JSON.stringify(account)}
          label={
            <AccountCheckComp
              account={account}
              border={border}
              monthlyPayment={monthlyPayment}
            />
          }
        />
      ))}
    </RadioGroup>
  );
}
