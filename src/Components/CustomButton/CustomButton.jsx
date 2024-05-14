import { Button } from "@mui/material";

function CustomButton({ buttonText, type }) {
  return (
    <Button type={type} variant="outlined">
      {buttonText}
    </Button>
  );
}

export default CustomButton;
