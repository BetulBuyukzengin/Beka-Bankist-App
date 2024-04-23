import { Grid, TextField } from "@mui/material";
import CustomTabs from "./CustomTabs";
import WithIbanTab from "./WithIbanTab";
import AccountNumberTab from "./AccountNumberTab";
const content = [
  {
    label: "With Iban",
    component: <WithIbanTab />,
  },
  { label: "With Account Numbers", component: <AccountNumberTab /> },
];
// can make with use qr code

function NewRecipientTab() {
  const orientation = "vertical";
  return (
    <>
      <CustomTabs orientation={orientation} content={content} />
    </>
  );
}

export default NewRecipientTab;
