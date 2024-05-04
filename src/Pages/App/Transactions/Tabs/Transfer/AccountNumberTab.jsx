import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useEffect } from "react";
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
  const { register, setValue, watch } = useFormContext();
  const watchSaveAsRegisteredWithAccount = watch("saveAsRegisteredWithAccount");

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
            defaultValue=""
            register={{ ...register("bankName") }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomSelect
            data={branchContent}
            // handleChange={handleBranchChange}
            // value={branch}
            defaultValue=""
            register={{
              ...register("bankBranch"),
            }}
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
            register={{ ...register("fullNameWithAccount") }}
          />
        </Grid>

        {watchSaveAsRegisteredWithAccount && (
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
          xs={watchSaveAsRegisteredWithAccount ? 6 : 12}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <FormControlLabel
            control={<Switch />}
            label="Add as registered recipient"
            {...register("saveAsRegisteredWithAccount")}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AccountNumberTab;
