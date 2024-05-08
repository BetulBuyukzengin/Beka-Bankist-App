import { useEffect, useState } from "react";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import styled from "styled-components";
import { useUser } from "../../../../../services/userServices";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import CustomDatePicker from "../../../../../Components/CustomDatePicker/CustomDatePicker";
import { useFormContext } from "react-hook-form";

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
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [showUsernameInDescription, setShowUsernameInDescription] =
    useState(false);
  const { user } = useUser();
  const { register, setValue } = useFormContext();

  const handleSwitchChange = () => {
    setShowUsernameInDescription((prev) => !prev);
  };
  //! ters çalışıyor
  useEffect(
    function () {
      if (showUsernameInDescription) {
        setValue(
          "transferDescription",
          `${description} ${user?.user_metadata?.fullName}`
        );
      } else
        setValue(
          "transferDescription",
          description.slice(-user?.user_metadata?.fullName.length - 1)
        );
    },
    [showUsernameInDescription]
  );

  const handleChangeDescription = (e) => {
    if (!showUsernameInDescription) setDescription(e.target.value);
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
            defaultValue=""
            register={register("paymentMethod")}
          />
        </StyledGrid>

        <StyledGrid item xs={12}>
          <CustomTextField
            disabled={showUsernameInDescription}
            width="short"
            value={description}
            id="description"
            register={register("transferDescription")}
            label="Description"
            onChange={(e) => handleChangeDescription(e)}
          />
        </StyledGrid>
        <StyledGrid item xs={12}>
          <CustomDatePicker
            label="Transaction date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            register={register("transactionDate")}
          />
        </StyledGrid>
        <StyledGrid item xs={12}>
          <FormControlLabel
            sx={{ width: "40%" }}
            control={<Switch onChange={handleSwitchChange} />}
            label="Show username in description"
            {...register("showUsernameDescription")}
          />
        </StyledGrid>
      </Grid>
    </>
  );
}
export default DetailDetermination;
