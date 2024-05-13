import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import CustomDatePicker from "../../../Components/CustomDatePicker/CustomDatePicker";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import CustomSelect from "../../../Components/CustomSelect/CustomSelect";
import { useSearchParams } from "react-router-dom";
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

function AccountCreate() {
  const { register, watch } = useFormContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const watchBankName = watch("bankName");
  const watchBankBranch = watch("bankBranch");
  const [value, setValue] = useState(new Date());
  //   const [selectBank, setSelectBank] = useState();
  //   const [selectBranch, setSelectBranch] = useState();

  useEffect(
    function () {
      if (
        watchBankName !== "" &&
        watchBankName !== undefined &&
        watchBankName === null
      ) {
        searchParams.set("selected-bank", watchBankName);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams, watchBankName]
  );
  //   console.log(watchBankBranch, watchBankName);
  //   useEffect(
  //     function () {
  //       if (watchBankName !== "" && watchBankName !== undefined) {
  //         searchParams.set("selected-bank", watchBankName);
  //         setSearchParams(searchParams);
  //       }
  //       if (watchBankBranch !== "" && watchBankBranch !== undefined) {
  //         searchParams.set("selected-branch", watchBankBranch);
  //         setSearchParams(searchParams);
  //       }
  //     },
  //     [searchParams, setSearchParams, watchBankName, watchBankBranch]
  //   );

  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        paddingBottom: "1rem",
        paddingRight: "1rem",
      }}
    >
      <Grid item xs={6}>
        <CustomTextField id="fullName" label="Full Name" />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField id="adress" label="Adress" />
      </Grid>
      <Grid item xs={6}>
        <CustomSelect
          value={searchParams.get("selected-bank") || ""}
          data={bankContent}
          defaultValue=""
          //   value={selectBank || searchParams.get("selectBank")}
          //   onChange={(e) => handleChangeBank(e)}
          register={register("bankName")}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomSelect
          data={branchContent}
          //   value={selectBranch}
          //   onChange={(e) => setSelectBranch(e)}
          value={searchParams.get("selected-branch") || ""}
          defaultValue=""
          register={register("bankBranch")}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomDatePicker
          width="tall"
          label="Birthday"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField type="number" id="phoneNumber" label="Phone Number" />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <CustomButton type="submit" buttonName="CREATE" />
      </Grid>
    </Grid>
  );
}

export default AccountCreate;

// // dogum tarihi (eğer 18 yas altııse hesap acamasın)
// // sözleşme formu
