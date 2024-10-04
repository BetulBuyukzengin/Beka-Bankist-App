/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import CustomRadio from "../../../../../Components/CustomRadio/CustomRadio";
import { useGetRegisteredRecipients } from "../../../../../services/registeredRecipientsServices";
import styled from "styled-components";
import { media31_25em, media48em } from "../../../../../Constants/constants";

const GridStyle = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  "&:first-of-type": {
    marginTop: "1rem",
  },
};
const StyledRegisteredUsers = styled.div`
  text-align: center;
  padding: 2rem 0;
  ${media48em} {
    font-size: 0.9rem;
  }
  ${media31_25em} {
    font-size: 0.8rem;
  }
`;
function RegisteredRecipientsTab() {
  const { data: registeredRecipients } = useGetRegisteredRecipients();
  const { register } = useFormContext();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(value) {
    searchParams.set("registeredRecipient", value);
    setSearchParams(searchParams);
  }
  if (registeredRecipients.length === 0)
    return (
      <StyledRegisteredUsers>
        No registered users available...
      </StyledRegisteredUsers>
    );
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        color: "var(--color-text)",
      }}
    >
      <Grid item xs={6} sx={GridStyle}>
        <CustomRadio
          isRegisteredRecipients
          registeredRecipients={registeredRecipients}
          value={searchParams.get("registeredRecipient")}
          onChange={(e) => handleChange(e.target.value)}
          register={{ ...register("registeredRecipient") }}
        />
      </Grid>
    </Grid>
  );
}
export default RegisteredRecipientsTab;
