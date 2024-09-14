import { useEffect, useRef, useState } from "react";
import { FormControlLabel, FormHelperText, Grid, Switch } from "@mui/material";
import styled from "styled-components";
import { useUser } from "../../../../../services/userServices";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

// const StyledGrid = styled(Grid)`
//   display: flex;
//   justify-content: center;
// `;
const StyleGrid = {
  display: "flex",
  justifyContent: "center",
};
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
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
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

  const prevStatus = useRef(null);
  const currentStatus = searchParams.get("status");

  //! setDescription, setShowUsernameInDescription yu lifting state yapabilirsin performansı etkilerse!!
  useEffect(
    function () {
      if (currentStatus !== prevStatus.current) {
        setDescription("");
        setShowUsernameInDescription(false);
      }
    },
    [currentStatus, setValue]
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
          // flexDirection: "column!important",
          // alignItems: "center",
          "@media (max-width:48em)": {
            marginLeft: "0",
            overflow: "hidden",
          },
        }}
      >
        <Grid
          item
          xs={12}
          sx={{ ...StyleGrid, flexDirection: "column", alignItems: "center" }}
        >
          <CustomSelect
            value={searchParams.get("payment-method") || ""}
            width="40%"
            data={paymentMethod}
            defaultValue=""
            register={register("paymentMethod")}
            error={errors?.paymentMethod}
          />
          {errors?.paymentMethod && (
            <FormHelperText error sx={{ width: "40%", marginLeft: ".8rem" }}>
              {errors?.paymentMethod?.message}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} sx={StyleGrid}>
          <CustomTextField
            disabled={showUsernameInDescription}
            width="short"
            value={searchParams.get("description") || ""}
            id="description"
            register={register("transferDescription")}
            label="Description"
            onChange={(e) => handleChangeDescription(e)}
          />
        </Grid>
        <Grid item xs={12} sx={StyleGrid}>
          <FormControlLabel
            sx={{
              width: "40%",
              "@media (max-width: 48em)": {
                width: "80% !important",
              },
              "&>span:last-child": {
                "@media (max-width: 48em)": {
                  fontSize: ".7rem",
                },
                "@media (max-width: 31.25em)": {
                  fontSize: ".6rem",
                },
              },
            }}
            control={
              <Switch
                checked={showUsernameInDescription}
                onChange={handleChangeSwitch}
              />
            }
            label="Show username in description"
            {...register("showUsernameDescription")}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default DetailDetermination;
