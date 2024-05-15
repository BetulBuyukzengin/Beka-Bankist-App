/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

function CustomButton({ buttonText, type, onClick, disabled }) {
  return (
    <Button
      disabled={disabled}
      type={type}
      onClick={onClick}
      variant="outlined"
    >
      {buttonText}
    </Button>
  );
}

export default CustomButton;
