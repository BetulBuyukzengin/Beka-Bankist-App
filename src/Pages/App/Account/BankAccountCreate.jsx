/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import { media31_25em, media48em } from "../../../Constants/constants";
import AccountCreate from "./AccountCreate";

function BankAccountCreate({ setOpenCreateModal }) {
  return (
    <>
      <Typography
        component="h3"
        sx={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
          marginRight: "auto",
          marginLeft: "auto",
          marginBottom: 0,
          fontSize: "1.5rem",
          fontWeight: "bold",
          margin: "1rem 0",
          textAlign: "center",
          [media48em]: {
            fontSize: "1.2rem",
          },
          [media31_25em]: {
            fontSize: "1rem",
          },
        }}
      >
        Account Create
      </Typography>
      <AccountCreate setOpenCreateModal={setOpenCreateModal} />
    </>
  );
}

export default BankAccountCreate;
