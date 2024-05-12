import { useEffect, useState } from "react";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import styled from "styled-components";
import { useUser } from "../../../../../services/userServices";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

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
    content: "Housing Rent",
    value: "housingRent",
  },
  {
    content: "Workplace Rent",
    value: "workplaceRent",
  },
  {
    content: "E-Commerce Payment",
    value: "eCommercePayment",
  },
];

function DetailDetermination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [description, setDescription] = useState(
    searchParams.get("description") || ""
  );
  const [showUsernameInDescription, setShowUsernameInDescription] =
    useState(false);
  const { user } = useUser();
  const { register, setValue, watch } = useFormContext();
  const watchPaymentMethod = watch("paymentMethod");

  const handleChangeSwitch = () => {
    setShowUsernameInDescription((prev) => !prev);
  };

  useEffect(() => {
    const updatedDescription = showUsernameInDescription
      ? `${description} ${user?.user_metadata?.fullName}`
      : description;
    setValue("transferDescription", updatedDescription);
    searchParams.set("description", updatedDescription);
    setSearchParams(searchParams);
  }, [
    showUsernameInDescription,
    description,
    setValue,
    searchParams,
    setSearchParams,
    user?.user_metadata?.fullName,
  ]);

  useEffect(
    function () {
      if (watchPaymentMethod !== "" && watchPaymentMethod !== undefined) {
        searchParams.set("payment-method", watchPaymentMethod);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams, watchPaymentMethod]
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
            value={searchParams.get("payment-method") || ""}
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
            value={searchParams.get("description") || ""}
            id="description"
            register={register("transferDescription")}
            label="Description"
            onChange={(e) => handleChangeDescription(e)}
          />
        </StyledGrid>
        <StyledGrid item xs={12}>
          <FormControlLabel
            sx={{ width: "40%" }}
            control={
              <Switch
                checked={showUsernameInDescription}
                onChange={handleChangeSwitch}
              />
            }
            label="Show username in description"
            {...register("showUsernameDescription")}
          />
        </StyledGrid>
      </Grid>
    </>
  );
}
export default DetailDetermination;
