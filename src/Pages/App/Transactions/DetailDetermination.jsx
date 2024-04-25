import { useState } from "react";
import {
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import styled from "styled-components";

const StyledGrid = styled(Grid)`
  justify-content: center;
  display: flex;
`;

function DetailDetermination() {
  const [age, setAge] = useState("");
  const [value, setValue] = useState(new Date());
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          border: "1px solid var(--color-border-2)",
          paddingBottom: "1rem",
          paddingRight: "1rem",
          marginTop: "1rem",
        }}
      >
        <StyledGrid item xs={12}>
          <Select
            sx={{
              "&&": {
                color: "var(--color-text)",
                width: "40%",
                backgroundColor: "transparent",
                "&:hover > fieldset ": {
                  borderColor: "var(--color-text) !important",
                },
              },
              "&>fieldset": {
                borderColor: "var(--color-text)",
              },
            }}
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
                  backgroundColor: "var(--color-background-2)",
                  color: "var(--color-text)",
                },
              },
            }}
          >
            <MenuItem value="">Para gönderim tipi</MenuItem>
            <MenuItem
              sx={{
                ":hover": { backgroundColor: " rgba(25, 118, 210, 0.08)" },
              }}
              value={10}
            >
              Ten
            </MenuItem>
          </Select>
        </StyledGrid>
        <StyledGrid item xs={12}>
          <TextField
            sx={{
              width: "40%",
              "&:hover > div > fieldset": {
                borderColor: "var(--color-text)!important",
              },
              "&>label": {
                color: "var(--color-text)",
              },
              "&>div": {
                // backgroundColor: "pink",
                color: "var(--color-text)",
                "&>fieldset": {
                  borderColor: "var(--color-text)",
                },
              },
            }}
            id="outlined-basic"
            label="Açıklama"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </StyledGrid>
        <StyledGrid item xs={12}>
          <DatePicker
            label="Controlled picker"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            sx={{
              width: "40%",
              "&:hover > div > fieldset": {
                borderColor: "var(--color-text)!important",
              },
              "&>label": {
                color: "var(--color-text)",
              },
              "&>div": {
                // backgroundColor: "pink",
                color: "var(--color-text)",
                // "&>button": {
                //   color: "var(--color-text)",
                // },
                "&>fieldset": {
                  borderColor: "var(--color-text)",
                },
              },
            }}
          />
        </StyledGrid>
        <StyledGrid item xs={12}>
          <FormControlLabel
            sx={{ width: "40%" }}
            control={<Switch />}
            label="Açıklamaya gönderenin adı soyadı ilave edilsin"
          />
        </StyledGrid>
      </Grid>
    </>
  );
}

export default DetailDetermination;
