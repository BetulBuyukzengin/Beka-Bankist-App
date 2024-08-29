/* eslint-disable react/prop-types */
import { MenuItem, Select, Tooltip } from "@mui/material";

function CustomSelect({
  value,
  handleChange,
  data,
  width,
  disabled,
  disabledMenuItem,
  register,
  helperText,
  error,
  defaultValue,
  openedBankNames,
}) {
  return (
    <Select
      sx={{
        "&&": {
          color: "var(--color-text)",
          backgroundColor: "transparent",
          opacity: disabled ? "0.6!important" : "1!important",
          width: width,
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
      {/* {data.map((item, index) => (
        <Tooltip
          arrow
          key={index}
          title={
            openedBankNames?.includes(item.value)
              ? `You have already an account on ${item.content}`
              : null
          }
        >
          <span>
            <MenuItem
              sx={{
                pointerEvents: openedBankNames?.includes(item.value) && "none",
              }}
              key={index}
              value={item.value}
              disabled={openedBankNames?.includes(item.value)}
            >
              {item.content}
            </MenuItem>
          </span>
        </Tooltip>
      ))} */}

      {data.map((item, index) => (
        <MenuItem
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          value={item.value}
          disabled={
            openedBankNames?.includes(item.value) ||
            item.value === "" ||
            (item.value === "clearFilter" && disabledMenuItem)
          }
        >
          {item.content}
          {openedBankNames?.includes(item.value) ? (
            <em>(Already have an account)</em>
          ) : null}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CustomSelect;
