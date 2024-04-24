import { Grid, MenuItem, Select, TextField } from "@mui/material";

import { useState } from "react";

function AccountNumberTab() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          border: "1px solid var(--color-border-2)  ",
          paddingBottom: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Grid item xs={6}>
          <Select
            id="demo-customized-select-native"
            value={age}
            onChange={handleChange}
            fullWidth
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                horizontal: "center",
                vertical: "bottom",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              getContentAnchorEl: null,
              PaperProps: {
                style: {
                  maxHeight: 200,
                  width: 20,
                  left: "200px",
                  horizontal: "center",
                },
              },
            }}
          >
            <MenuItem value="">
              <label>Select Bank</label>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            id="demo-customized-select-native"
            value={age}
            onChange={handleChange}
            fullWidth
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                horizontal: "center",
                vertical: "bottom",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              getContentAnchorEl: null,
              PaperProps: {
                style: {
                  maxHeight: 200,
                  width: 20,
                  left: "200px",
                  horizontal: "center",
                },
              },
            }}
          >
            <MenuItem value="">
              <label>Select Branch</label>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="IBAN"
            variant="outlined"
            defaultValue="TR"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Full Name"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AccountNumberTab;
