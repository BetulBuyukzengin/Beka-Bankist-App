import { Button } from "@mui/material";

function CustomButton({ buttonText, type, onClick }) {
  return (
    <Button type={type} onClick={onClick} variant="outlined">
      {buttonText}
    </Button>
  );
}

export default CustomButton;
