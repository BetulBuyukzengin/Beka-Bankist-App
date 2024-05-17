import { DatePicker } from "@mui/x-date-pickers";

/* eslint-disable react/prop-types */
function CustomDatePicker({
  value,
  onChange,
  label,
  width,
  register,
  margin,
  // required,
  helperText,
  error,
}) {
  const isError = value;
  return (
    <DatePicker
      label={label}
      value={value}
      // error={error}
      // required={required}
      onChange={onChange}
      slotProps={{
        popper: { placement: "right-start" },
        textField: {
          // required: "This field is required!",
          helperText: helperText,
          // required: required ? "This field is required!" : undefined,
          error: isError,
        },
      }}
      {...register}
      sx={{
        marginTop: margin === "small" && "1rem",
        width: width === "small" ? "70%" : "100%",
        "&:hover > div > fieldset": {
          borderColor: "var(--color-text)!important",
        },
        "&>label": {
          color: "var(--color-text)",
        },
        "& > div": {
          color: "var(--color-text)",

          "& > fieldset": {
            borderColor: isError
              ? "red !important"
              : "var(--color-border-2) !important",
            // borderColor: "var(--color-border-2)!important",
          },
        },
      }}
    />
  );
}

export default CustomDatePicker;
