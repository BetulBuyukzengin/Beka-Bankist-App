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
import { useUser } from "../../../services/userServices";

const StyledGrid = styled(Grid)`
  justify-content: center;
  display: flex;
`;

function DetailDetermination() {
  const [money, setMoney] = useState("");
  const [date, setDate] = useState(new Date());

  const [showUsernameInDescription, setShowUsernameInDescription] =
    useState(false);
  // const [username, setUsername] = useState("");
  const { user } = useUser();

  const handleSwitchChange = () => {
    setShowUsernameInDescription((prev) => !prev);
  };

  const handleChange = (event) => {
    setMoney(event.target.value);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
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
            value={money}
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
              Other payment
            </MenuItem>
            <MenuItem
              sx={{
                ":hover": { backgroundColor: " rgba(25, 118, 210, 0.08)" },
              }}
              value="Housing rent"
            >
              Housing rent
            </MenuItem>
            <MenuItem
              sx={{
                ":hover": { backgroundColor: " rgba(25, 118, 210, 0.08)" },
              }}
              value="Workplace rent"
            >
              Workplace rent
            </MenuItem>
            <MenuItem
              sx={{
                ":hover": { backgroundColor: " rgba(25, 118, 210, 0.08)" },
              }}
              value="Other rents"
            >
              Other rents
            </MenuItem>
            <MenuItem
              sx={{
                ":hover": { backgroundColor: " rgba(25, 118, 210, 0.08)" },
              }}
              value="E Commerce payment"
            >
              E Commerce payment
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
                color: "var(--color-text)",
                "&>fieldset": {
                  borderColor: "var(--color-text)",
                },
              },
            }}
            value={
              showUsernameInDescription ? user?.user_metadata?.fullName : ""
            }
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
            value={date}
            onChange={(newValue) => setDate(newValue)}
            sx={{
              width: "40%",
              "&:hover > div > fieldset": {
                borderColor: "var(--color-text)!important",
              },
              "&>label": {
                color: "var(--color-text)",
              },
              "&>div": {
                color: "var(--color-text)",
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
            control={
              <Switch
                // checked={showUsernameInDescription}
                onChange={handleSwitchChange}
              />
            }
            label="Show username in description"
          />
        </StyledGrid>
      </Grid>
    </>
  );
}

export default DetailDetermination;
