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
const StyledLabel = styled.label`
  color: var(--color-text);
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
            sx={{ width: "40%", backgroundColor: "transparent" }}
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
                  backgroundColor: "transparent",
                  color: "var(--color-text)",
                },
              },
            }}
          >
            <MenuItem value="">
              <StyledLabel>Para gönderim tipi</StyledLabel>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </StyledGrid>
        <StyledGrid item xs={12}>
          <TextField
            sx={{
              width: "40%",
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
            sx={{ width: "40%" }}
            label="Controlled picker"
            value={value}
            onChange={(newValue) => setValue(newValue)}
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
