/* eslint-disable react/prop-types */
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useUser } from "../../../services/userServices";
import { formatDate } from "../../../utils/utils";
import CustomButton from "../../../Components/CustomButton/CustomButton";

const formContents = [
  {
    title: "Account Type",
    description:
      "The account type preferred by the Account Holder for the opening of the bank account has been specified. The bank will proceed with the account opening process accordingly.",
  },
  {
    title: "Fees and Charges",
    description:
      " The Account Holder has been informed about all applicable account fees, charges, and interest rates that may be associated with the opening of the bank account.",
  },
  {
    title: "Account Usage and Transaction Limits",
    description:
      "The Account Holder has been informed of the transaction limits, daily withdrawal limits and other restrictions that may apply when using the bank account.",
  },
  {
    title: "Account Security",
    description:
      "The Account Holder has been informed about the measures to be taken regarding the security of the Bank account and the protection of the account information. The Account Holder agrees to keep the account information secure and protect it from unauthorized access.",
  },
  {
    title: "Legal Responsibilities",
    description:
      " The Account Holder agrees to abide by the law when using the bank account, not to engage in any illegal activity and to use the bank account for lawful purposes.",
  },
];

function Text({ content, type }) {
  return (
    <Grid container sx={{ alignItems: "center" }}>
      <Grid item xs={type === "openingInfo" ? 12 : 3}>
        <Typography variant="h6">{content.title}:</Typography>
      </Grid>
      <Grid item xs={type === "openingInfo" ? 12 : 9}>
        <Typography variant="body2">{content.description}</Typography>
      </Grid>
    </Grid>
  );
}
export default function AccountConsentForm({
  phoneNumber,
  setChecked,
  setOpen,
}) {
  const { getValues } = useFormContext();
  const { fullName, address } = getValues();
  const { user } = useUser();
  const date = new Date();

  const accountHoldersInformations = [
    { title: "Name - Surname", description: fullName },
    { title: "Address", description: address },
    { title: "Phone Number", description: phoneNumber },
    { title: "E-mail Address", description: user.email },
  ];
  function handleClick() {
    setChecked(true);
    setOpen(false);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="body2">
          This document is intended for the following person(s)
          <strong> {fullName}</strong> to inform and consent to the opening of a
          bank account. The Account Holder has understood and accepted the
          information set out below.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          <strong>Account Holder Information:</strong>
        </Typography>
        <List
          sx={{
            bgcolor: "background.paper",
            position: "relative",
            "& ul": { padding: 0 },
          }}
        >
          {accountHoldersInformations.map((information, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <ListItemText
                sx={{ width: "90%" }}
                primary={<Text content={information} />}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          <strong>Bank Account Opening Information:</strong>
        </Typography>
        <List
          sx={{
            bgcolor: "background.paper",
            position: "relative",
            "& ul": { padding: 0 },
          }}
        >
          {formContents.map((content, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <ListItemText
                primary={<Text content={content} type="openingInfo" />}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          <strong>Approval:</strong>
        </Typography>
        <Typography variant="body2" sx={{ margin: ".5rem 0" }}>
          Based on the above information, the Account Holder, bank account
          opening for the necessary approval.
        </Typography>
        <Typography variant="body1">{formatDate(date)}</Typography>
      </Grid>
      <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
        <CustomButton buttonText="Read and Understood" onClick={handleClick} />
      </Grid>
    </Grid>
  );
}
