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
        backgroundColor: disabled && "var(--color-background-3)!important",
        color: disabled && "white!important",
        // backgroundColor: disabled
        //   ? "var(--color-background-3)!important"
        //   : "var(--color-background)!important",
      }}
    >
      {buttonText}
    </Button>
  );
}

export default CustomButton;
