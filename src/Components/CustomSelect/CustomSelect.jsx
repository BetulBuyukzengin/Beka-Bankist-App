/* eslint-disable react/prop-types */
import { MenuItem, Select } from "@mui/material";

function CustomSelect({
  value,
  handleChange,
  data,
  width,
  disabled,
  register,
  helperText,
  error,
  defaultValue,
}) {
  return (
    <Select
      sx={{
        "&&": {
          color: "var(--color-text)",
          backgroundColor: "transparent",
          opacity: disabled ? "0.6!important" : "1!important",
          width: width ? "40%!important" : "100%!important",
          "&> .Mui-disabled": {
            WebkitTextFillColor: "var(--color-text)",
          },
          "&:hover > fieldset ": {
            borderColor: disabled
              ? "var(--color-border-2)!important"
              : "var(--color-gray)!important",
          },
          "&>fieldset": {
            borderColor: "var(--color-border-2)",
          },
        },
      }}
      id="demo-customized-select-native"
      value={value}
      onChange={handleChange}
      fullWidth
      helperText={helperText}
      error={error}
      displayEmpty
      {...register}
      defaultValue={defaultValue}
      disabled={disabled}
      MenuProps={{
        anchorOrigin: {
          horizontal: "center",
          vertical: "bottom",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        PaperProps: {
          style: {
            maxHeight: 200,
            width: 20,
            left: "200px",
            horizontal: "center",
            backgroundColor: "var(--color-background-2)",
            color: "var(--color-text)",
          },
        },
      }}
    >
      {data.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.content}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CustomSelect;
