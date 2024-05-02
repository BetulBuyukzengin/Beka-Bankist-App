import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useState } from "react";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";

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
          />
        </Grid>
        <Grid item xs={6}>
          <CustomSelect
            data={branchContent}
            handleChange={handleBranchChange}
            value={branch}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField id="accountNumber" label="Account Number" />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField id="fullName" label="Full Name" />
        </Grid>

        {showShortNameBox && (
          <Grid item xs={6}>
            <CustomTextField id="shortName" label="Short Name" />
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
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AccountNumberTab;
