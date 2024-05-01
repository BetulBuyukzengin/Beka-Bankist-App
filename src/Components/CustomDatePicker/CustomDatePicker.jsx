import { DatePicker } from "@mui/x-date-pickers";

/* eslint-disable react/prop-types */
function CustomDatePicker({ value, onChange, label, width }) {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      sx={{
        width: width ? "100%" : "40%",
        "&:hover > div > fieldset": {
          borderColor: "var(--color-text)!important",
        },
        "&>label": {
          color: "var(--color-text)",
        },
        "& > div": {
          color: "var(--color-text)",

          "& > fieldset": {
            borderColor: "var(--color-border-2)!important",
          },
        },
      }}
    />
  );
}

export default CustomDatePicker;
