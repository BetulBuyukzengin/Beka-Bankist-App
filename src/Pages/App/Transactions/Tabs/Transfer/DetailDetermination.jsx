import { useState } from "react";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import styled from "styled-components";
import { useUser } from "../../../../../services/userServices";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import CustomDatePicker from "../../../../../Components/CustomDatePicker/CustomDatePicker";

const StyledGrid = styled(Grid)`
  justify-content: center;
  display: flex;
`;

const paymentMethod = [
  {
    content: "Select Payment Method",
    value: "",
  },
  {
    content: "Housing rent",
    value: "housingRent",
  },
  {
    content: "Workplace rent",
    value: "workplaceRent",
  },
  {
    content: "E Commerce payment",
    value: "eCommercePayment",
  },
];

function DetailDetermination() {
  const [money, setMoney] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [showUsernameInDescription, setShowUsernameInDescription] =
    useState(false);
  const { user } = useUser();

  const handleSwitchChange = () => {
    setShowUsernameInDescription((prev) => !prev);
  };

  const handleChangeMoney = (event) => {
    setMoney(event.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
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
          <CustomSelect
            width="short"
            data={paymentMethod}
            handleChange={handleChangeMoney}
            value={money}
          />
        </StyledGrid>

        <StyledGrid item xs={12}>
          <CustomTextField
            disabled={showUsernameInDescription}
            width="short"
            value={`${description || ""} ${
              showUsernameInDescription ? user?.user_metadata?.fullName : ""
            }`}
            id="description"
            label="Description"
            onChange={(e) => handleChangeDescription(e)}
          />
        </StyledGrid>

        <StyledGrid item xs={12}>
          <CustomDatePicker
            label="Controlled picker"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </StyledGrid>
        <StyledGrid item xs={12}>
          <FormControlLabel
            sx={{ width: "40%" }}
            control={<Switch onChange={handleSwitchChange} />}
            label="Show username in description"
          />
        </StyledGrid>
      </Grid>
    </>
  );
}

export default DetailDetermination;
