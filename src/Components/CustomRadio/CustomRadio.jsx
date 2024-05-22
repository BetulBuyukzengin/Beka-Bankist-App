/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { NavigateNext } from "@mui/icons-material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useGetAccounts } from "../../services/accountServices";
import { formatCurrency, formatWord } from "../../utils/utils";
import Loader from "../Loader/Loader";

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
  margin: 1rem 0;
  border: 1px solid var(--color-border-2);
`;

function AccountCheckComp({ account }) {
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));

  return (
    <StyledAccountCheckComponent
      style={{
        backgroundColor:
          account?.accountNumber === selectedAccount?.accountNumber &&
          "var(--color-background-3)",
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
  );
}

export default function CustomRadio({ register, onChange, value }) {
  const { isLoading, accounts } = useGetAccounts();
  if (isLoading) return <Loader />;
  return (
    <RadioGroup
      aria-labelledby="selected-account-aria-label"
      name="selected-account-radio-group"
      value={value}
      onChange={onChange}
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
          }}
          {...register}
          control={
            <Radio
              sx={{
                height: "7rem",
                width: "17rem",
                // position: "fixed",
                borderRadius: "0px",
                // opacity: "0",
                "&+span": {
                  width: "17rem",
                  height: "10rem!important",
                },
              }}
            />
          }
          value={JSON.stringify(account)}
          label={<AccountCheckComp account={account} />}
        />
      ))}
    </RadioGroup>
  );
}
