import { FormControlLabel, FormHelperText, Grid, Switch } from "@mui/material";
import { useEffect } from "react";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { maxAccountNumberLength } from "../../../../../Constants/constants";

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
  // useEffect(
  //   function () {
  //     if (searchParams.get("status") === "With Account Numbers") {
  //       searchParams.set(
  //         "saveAsRegisteredWithAccount",
  //         watchSaveAsRegisteredWithAccount
  //       );
  //       setSearchParams(searchParams);
  //     } else {
  //       searchParams.delete("saveAsRegisteredWithAccount");
  //       setSearchParams(searchParams);
  //     }
  //   },

  //   [watchSaveAsRegisteredWithAccount, searchParams, setSearchParams]
  // );
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "1rem",
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
            helperText={errors?.recipientBankName?.message}
            error={errors?.recipientBankName}
          />
          {errors?.recipientBankName && (
            <FormHelperText error sx={{ marginLeft: ".8rem" }}>
              {errors?.recipientBankName?.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={6}>
          <CustomSelect
            data={branchContent}
            value={searchParams.get("selected-branch") || ""}
            defaultValue=""
            register={{
              ...register("recipientBankBranch"),
            }}
            error={errors?.recipientBankBranch}
          />
          {errors?.recipientBankBranch && (
            <FormHelperText error sx={{ marginLeft: ".8rem" }}>
              {errors?.recipientBankBranch?.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="recipientAccountNumber"
            label="Recipient Account Number"
            register={{ ...register("recipientAccountNumber") }}
            helperText={errors?.recipientAccountNumber?.message}
            error={errors?.recipientAccountNumber}
            inputProps={{ maxLength: maxAccountNumberLength }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="recipientFullNameAccount"
            label="Recipient Full Name"
            register={{ ...register("recipientFullNameWithAccount") }}
            helperText={errors?.recipientFullNameWithAccount?.message}
            error={errors?.recipientFullNameWithAccount}
          />
        </Grid>

        {watchSaveAsRegisteredWithAccount && (
          <Grid item xs={6}>
            <CustomTextField
              id="shortName"
              label="Short Name"
              register={{ ...register("shortName") }}
              helperText={errors?.shortName?.message}
              error={errors?.shortName}
            />
            {}
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
