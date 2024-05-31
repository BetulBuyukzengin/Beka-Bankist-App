import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useEffect } from "react";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const bankContent = [
  {
    content: "Select Recipient Bank",
    value: "",
  },
  {
    content: "Ziraat ",
    value: "ziraat",
  },
  {
    content: "Akbank ",
    value: "akbank",
  },
];

const branchContent = [
  {
    content: "Select Recipient Branch",
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
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const watchSaveAsRegisteredWithAccount = watch("saveAsRegisteredWithAccount");
  const [searchParams, setSearchParams] = useSearchParams();
  const watchRecipientBankName = watch("recipientBankName");
  const watchBankBranch = watch("recipientBankBranch");

  useEffect(
    function () {
      if (
        watchRecipientBankName !== "" &&
        watchRecipientBankName !== undefined
      ) {
        searchParams.set("selected-bank", watchRecipientBankName);
        setSearchParams(searchParams);
      }
      if (watchBankBranch !== "" && watchBankBranch !== undefined) {
        searchParams.set("selected-branch", watchBankBranch);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams, watchRecipientBankName, watchBankBranch]
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
            value={searchParams.get("selected-bank") || ""}
            defaultValue=""
            register={{
              ...register("recipientBankName"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomSelect
            data={branchContent}
            value={searchParams.get("selected-branch") || ""}
            defaultValue=""
            register={{
              ...register("recipientBankBranch"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="recipientAccountNumber"
            label="Recipient Account Number"
            register={{ ...register("recipientAccountNumber") }}
            helperText={errors?.recipientAccountNumber?.message}
            error={errors?.recipientAccountNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="recipientFullNameAccount"
            label="Recipient Full Name"
            register={{ ...register("recipientFullNameWithAccount") }}
            helperText={errors?.recipientAccountNumber?.message}
            error={errors?.recipientAccountNumber}
          />
        </Grid>

        {watchSaveAsRegisteredWithAccount && (
          <Grid item xs={6}>
            <CustomTextField
              id="shortName"
              label="Short Name"
              register={{ ...register("shortName") }}
              // helperText={errors?.recipientAccountNumber?.message}
              // error={errors?.recipientAccountNumber}
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
            // helperText={errors?.recipientAccountNumber?.message}
            // error={errors?.recipientAccountNumber}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AccountNumberTab;
