import { DatePicker } from "@mui/x-date-pickers";

/* eslint-disable react/prop-types */
function CustomDatePicker({ value, onChange, label, width, register, margin }) {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      {...register}
      sx={{
        marginTop: margin === "small" && "1rem",
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
