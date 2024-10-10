/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

function CustomButton({
  buttonText,
  type,
  onClick,
  disabled,
  color,
  variant,
  style,
}) {
  return (
    <Button
      disabled={disabled}
      type={type}
      onClick={onClick}
      variant={variant || "outlined"}
      color={color || "primary"}
      sx={{
        ...style,
        backgroundColor: disabled
          ? "var(--color-background-3)"
          : "var(--color-background=",
      }}
    >
      {buttonText}
    </Button>
  );
}

export default CustomButton;
