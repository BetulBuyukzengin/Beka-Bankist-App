import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";

const bankContent = [
  {
    content: "Select Recipient Bank",
    value: "",
  },
  {
    content: "Ziraat Bank",
    value: "ziraatBank",
  },
  {
    content: "Akbank Bank",
    value: "akbankBank",
  },
];

const branchContent = [
  {
    content: "Select Branch",
    value: "",
  },
  {
    content: "Meram-200",
    value: "meram",
  },
  {
    content: "Merkezefendi-300",
    value: "merkezefendi",
  },
];

function AccountNumberTab() {
  const { register, setValue } = useFormContext();
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");

  const handleBankChange = (event) => {
    setBank(event.target.value);
  };
  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const [showShortNameBox, setShowShortNameBox] = useState(false);

  const handleSwitchChange = () => {
    setShowShortNameBox((prev) => !prev);
  };
  useEffect(
    function () {
      setValue("bankName", "");
      setValue("bankBranch", "");
    },
    [setValue]
  );

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          paddingBottom: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Grid item xs={6}>
          <CustomSelect
            data={bankContent}
            handleChange={handleBankChange}
            value={bank}
            ref={{
              ...register("bankName"),
            }}
            // ref={{
            //   ...register("bankName", {
            //     value: bank,
            //     onChange: handleBankChange,
            //   }),
            // }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomSelect
            data={branchContent}
            handleChange={handleBranchChange}
            value={branch}
            ref={{
              ...register("bankBranch"),
            }}
            // ref={{
            //   ...register("bankBranch", {
            //     value: branch,
            //     onChange: handleBranchChange,
            //   }),
            // }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="accountNumber"
            label="Account Number"
            register={{ ...register("accountNumber") }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="fullName"
            label="Full Name"
            register={{ ...register("fullName") }}
          />
        </Grid>

        {showShortNameBox && (
          <Grid item xs={6}>
            <CustomTextField
              id="shortName"
              label="Short Name"
              register={{ ...register("shortName") }}
            />
          </Grid>
        )}
        <Grid
          item
          xs={showShortNameBox ? 6 : 12}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <FormControlLabel
            control={<Switch onChange={handleSwitchChange} />}
            label="Add as registered recipient"
            register={{ ...register("registeredRecipient") }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AccountNumberTab;
