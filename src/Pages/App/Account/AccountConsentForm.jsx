/* eslint-disable react/prop-types */
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import { media31_25em, media48em } from "../../../Constants/constants";
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import { useUser } from "../../../services/userServices";
import { formatArrayWord, formatDate } from "../../../utils/utils";

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

function Text({ content, holderInformation }) {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sm={holderInformation ? 4 : 12}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            [media48em]: {
              fontSize: ".9rem",
            },
            [media31_25em]: {
              fontSize: ".8rem",
            },
          }}
        >
          {content.title}:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={holderInformation ? 8 : 12}>
        <Typography
          variant="body2"
          sx={{
            [media48em]: {
              fontSize: ".9rem",
            },
            [media31_25em]: {
              fontSize: ".8rem",
            },
          }}
        >
          {content.description}
        </Typography>
      </Grid>
    </Grid>
  );
}
export default function AccountConsentForm({ setChecked, setOpen }) {
  const {
    currentUser: { fullName, applicantAddress },
  } = useCurrentUser();

  const { user } = useUser();
  const date = new Date();

  const accountHoldersInformations = [
    { title: "Name - Surname", description: formatArrayWord(fullName) },
    { title: "Address", description: formatArrayWord(applicantAddress) },
    { title: "E-mail Address", description: user.email },
  ];
  function handleClick() {
    setChecked(true);
    setOpen(false);
  }

  return (
    <Grid
      container
      spacing={3}
      sx={{
        height: "100%",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="body2"
          sx={{
            [media48em]: {
              fontSize: ".9rem",
            },
            [media31_25em]: {
              fontSize: ".8rem",
            },
          }}
        >
          This document is intended for the following person(s)
          <strong> {formatArrayWord(fullName)}</strong> to inform and consent to
          the opening of a bank account. The Account Holder has understood and
          accepted the information set out below.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            [media48em]: {
              fontSize: "1rem",
            },
            [media31_25em]: {
              fontSize: ".9rem",
            },
          }}
        >
          <strong>Account Holder Information:</strong>
        </Typography>
        <List
          sx={{
            backgroundColor: "transparent",
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
                width: "100%",
                [media48em]: {
                  fontSize: "1rem",
                  paddingLeft: "0",
                  paddingRight: "0",
                },
                [media31_25em]: {
                  fontSize: ".9rem",
                },
              }}
            >
              <ListItemText
                sx={{
                  width: "90%",
                  [media48em]: {
                    fontSize: "1rem",
                    paddingLeft: "0",
                    paddingRight: "0",
                  },
                  [media31_25em]: {
                    fontSize: ".9rem",
                  },
                }}
                primary={<Text content={information} holderInformation />}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            [media48em]: {
              fontSize: "1rem",
            },
            [media31_25em]: {
              fontSize: ".9rem",
            },
          }}
        >
          <strong>Bank Account Opening Information:</strong>
        </Typography>
        <List
          sx={{
            backgroundColor: "transparent",
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
              <ListItemText primary={<Text content={content} />} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          sx={{
            [media48em]: {
              fontSize: "1rem",
            },
            [media31_25em]: {
              fontSize: ".9rem",
            },
          }}
        >
          <strong>Approval:</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            margin: ".5rem 0",
            [media48em]: {
              fontSize: ".9rem",
            },
            [media31_25em]: {
              fontSize: ".8rem",
            },
          }}
        >
          Based on the above information, the Account Holder, bank account
          opening for the necessary approval.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            [media48em]: {
              fontSize: ".9rem",
            },
            [media31_25em]: {
              fontSize: ".8rem",
            },
          }}
        >
          {formatDate(date)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          justifyContent: "center",
          display: "flex",
          paddingBottom: "2rem",
        }}
      >
        <CustomButton buttonText="Read and Understood" onClick={handleClick} />
      </Grid>
    </Grid>
  );
}
