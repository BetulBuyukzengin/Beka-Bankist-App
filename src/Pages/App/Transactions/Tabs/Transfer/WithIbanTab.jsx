import { FormControlLabel, Grid, Switch } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { formatIBAN } from "../../../../../utils/utils";
import { maxIbanLength } from "../../../../../Constants/constants";
import { useSearchParams } from "react-router-dom";

function WithIbanTab() {
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const watchSaveAsRegisteredWithIban = watch("saveAsRegisteredWithIban");
  const [iban, setIban] = useState("TR"); // IBAN durumunu saklayın
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (event) => {
    const formattedIban = formatIBAN(event.target.value);
    setIban(formattedIban); // Formatlanmış IBAN'ı duruma ayarlayın
  };

  useEffect(
    function () {
      searchParams.set(
        "saveAsRegisteredWithIban",
        watchSaveAsRegisteredWithIban
      );
      setSearchParams(searchParams);
    },
    [watchSaveAsRegisteredWithIban]
  );
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "1rem",
        }}
      >
        <Grid item xs={6} sx={{ display: "flex", gap: "1rem" }}>
          <CustomTextField
            id="recipientIban"
            label="Recipient Iban"
            defaultValue="TR"
            value={iban} // Değer olarak formatlanmış IBAN'ı kullanın
            onChange={handleChange} // Değişiklik olduğunda formatIBAN fonksiyonunu çağırın
            register={{
              ...register("recipientIban"),
            }}
            inputProps={{ maxLength: maxIbanLength }}
            helperText={errors?.recipientIban?.message}
            error={errors?.recipientIban}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", gap: "1rem" }}>
          <CustomTextField
            id="recipientFullName"
            label="Recipient Full Name"
            register={{
              ...register("recipientFullNameWithIban"),
            }}
            helperText={errors?.recipientFullNameWithIban?.message}
            error={errors?.recipientFullNameWithIban}
          />
        </Grid>

        {watchSaveAsRegisteredWithIban && (
          <Grid item xs={6}>
            <CustomTextField
              id="shortName"
              label="Short Name"
              register={{ ...register("shortName") }}
              helperText={errors?.shortName?.message}
              error={errors?.shortName}
            />
          </Grid>
        )}
        <Grid
          item
          xs={watchSaveAsRegisteredWithIban ? 6 : 12}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <FormControlLabel
            control={<Switch />}
            label="Add as registered recipient"
            {...register("saveAsRegisteredWithIban")}
            helperText={errors?.saveAsRegisteredWithIban?.message}
            error={errors?.saveAsRegisteredWithIban}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default WithIbanTab;
