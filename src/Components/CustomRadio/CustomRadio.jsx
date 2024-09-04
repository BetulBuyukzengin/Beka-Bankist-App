/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import BankAccounts from "../../Pages/App/Transactions/Tabs/Transfer/BankAccounts";
import Registereds from "../../Pages/App/Transactions/Tabs/Transfer/Registereds";
import { useGetAccounts } from "../../services/accountServices";
import Loader from "../Loader/Loader";

export default function CustomRadio({
  register,
  onChange,
  value,
  border,
  onClick,
  monthlyPayment,
  registeredRecipients,
  isRegisteredRecipients,
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
      {isRegisteredRecipients
        ? registeredRecipients.map((registered) => (
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
                    borderRadius: "0px",
                    "&+span": {
                      width: "17rem",
                    },
                  }}
                />
              }
              value={JSON.stringify(registered)}
              label={<Registereds registered={registered} />}
            />
          ))
        : accounts.map((account) => (
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
                <BankAccounts
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
