/* eslint-disable react/prop-types */
import { NavigateNext } from "@mui/icons-material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import styled from "styled-components";

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

const accounts = [
  {
    branch: "Meram-500",
    balance: 500,
    accountNumber: 416465464156,
  },
  {
    branch: "Acıpayam-500",
    balance: 50,
    accountNumber: 111514654156,
  },
  {
    branch: "Selçuklu-500",
    balance: 100,
    accountNumber: 200054654156,
  },
];
function AccountCheckComp({ account }) {
  return (
    <StyledAccountCheckComponent>
      <div>
        <StyledH6>{account.branch}</StyledH6>
        <StyledTitleLabel>
          Kullanılabilir bakiye: {account.balance}
        </StyledTitleLabel>
      </div>
      <div>
        <NavigateNext />
      </div>
    </StyledAccountCheckComponent>
  );
}

export default function CustomRadio({ register, onChange, value }) {
  return (
    <RadioGroup
      aria-labelledby="selected-account-aria-label"
      name="selected-account-radio-group"
      value={value}
      onChange={onChange}
    >
      {accounts.map((account) => (
        <FormControlLabel
          key={account.accountNumber}
          sx={{ marginLeft: "0", marginRight: "0" }}
          {...register}
          control={
            <Radio
              sx={{
                height: "20%",
                width: "21.5%",
                position: "absolute",
                borderRadius: "0px",
                "&+span": {
                  width: "17rem",
                },
              }}
            />
          }
          value={account.accountNumber}
          label={<AccountCheckComp account={account} />}
        />
      ))}
    </RadioGroup>
  );
}
