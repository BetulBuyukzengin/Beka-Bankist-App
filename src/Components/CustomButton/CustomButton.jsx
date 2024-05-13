import { Button } from "@mui/material";

function CustomButton({ buttonName, type }) {
  return (
    <Button type={type} variant="outlined">
      {buttonName}
    </Button>
  );
}

export default CustomButton;
