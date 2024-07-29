/* eslint-disable react/prop-types */
import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useMovements } from "../../../../../services/movementsServices";
import CustomRadio from "../../../../../Components/CustomRadio/CustomRadio";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { NavigateNext } from "@mui/icons-material";
import { useGetRegisteredRecipient } from "../../../../../services/registeredRecipientsServices";

//? movements dakı verileri cekip burada kayıtlı kullanıcı bılgılerını tutan bır obje yaratıp üzerinde map filter yapmak ya da
//? Transfer kısmında ayrı bir hook ile kullanıcı kaydetme objesı yaratıp supabase de ayrı kayıtlı kullanıcılar tablosune gonderıp o tabloyu cekme
//? İBAN,ACCOUNT NUMBER ,KISA AD,FULL NAME,BANK NAME,BANK BRANCH

const GridStyle = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  "&:first-of-type": {
    marginTop: "1rem",
  },
};

const StyledH6 = styled.h6`
  text-align: start;
`;
const StyledTitleLabel = styled.label`
  margin-right: 0.5rem;
`;

const StyledCheckRegisteredAccount = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7% 9%;
  border: 1px solid var(--color-border-2);
`;

function CheckRegisteredAccount({ account, border }) {
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <StyledCheckRegisteredAccount
        style={{
          backgroundColor:
            // account?.accountNumber === selectedAccount?.accountNumber &&
            "var(--color-background-3)",
          border:
            border === "standard"
              ? "none"
              : // : !selectedAccount && errors?.selectedAccount
                // ? "1px solid var(--color-error)"
                // : selectedAccount?.accountNumber === account?.accountNumber &&
                //   (selectedAccount.remainingDepositLimit === 0 ||
                //     selectedAccount.remainingWithdrawLimit === 0 ||
                //     (selectedAccount.remainingTransferLimit === 0 &&
                //       errors?.selectedAccount))
                // ? "1px solid var(--color-error)"
                "none",
        }}
      >
        <div>
          <StyledH6>{account.recipientShortName}</StyledH6>
          <StyledTitleLabel>
            {account.recipientAccountNumber || account.recipientIban}
          </StyledTitleLabel>
        </div>
        <div>
          <NavigateNext />
        </div>
      </StyledCheckRegisteredAccount>
    </>
  );
}

function RegisteredRecipientsTab() {
  const { data: getRegisteredRecipient, isLoading } =
    useGetRegisteredRecipient();

  const { register } = useFormContext();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(value) {
    searchParams.set("selectedAccount", value);
    setSearchParams(searchParams);
  }
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        color: "var(--color-text)",
      }}
    >
      <Grid item xs={6} sx={GridStyle}>
        <RadioGroup
          aria-labelledby="selected-account-aria-label"
          name="selected-account-radio-group"
          value={JSON.parse(searchParams.get("selectedAccount"))}
          onChange={(e) => handleChange(e.target.value)}
          sx={{
            display: "flex",
            gap: "1rem",
            cursor: "default",
          }}
        >
          {getRegisteredRecipient?.map((registered) => (
            <>
              <FormControlLabel
                key={registered.id}
                sx={{
                  marginLeft: "0",
                  marginRight: "0",
                  justifyContent: "center",
                }}
                {...register}
                control={
                  <Radio
                    sx={{
                      height: "7rem",
                      width: "17rem",
                      position: "relative",
                      borderRadius: "0px",
                      opacity: "0",
                      "&+span": {
                        width: "17rem",
                        position: "absolute",
                      },
                    }}
                  />
                }
                value={JSON.stringify(registered)}
                label={<CheckRegisteredAccount account={registered} />}
              />
            </>
          ))}
        </RadioGroup>
      </Grid>
    </Grid>
  );
}
export default RegisteredRecipientsTab;
