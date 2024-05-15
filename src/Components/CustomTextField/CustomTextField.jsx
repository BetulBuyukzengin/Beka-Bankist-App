/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  width: ${(props) =>
    props.width === "short" ? "40%!important" : "100%!important"};

  &:hover > div > fieldset {
    border-color: var(--color-gray) !important;
  }
  & > label {
    color: var(--color-text) !important;
  }
  & > div {
    color: var(--color-text);
    & > fieldset {
      border-color: var(--color-border-2);
    }
  }
  & div > input {
    &:disabled {
      -webkit-text-fill-color: var(--color-text) !important;
      color: var(--color-text) !important;
    }
    &:disabled + fieldset {
      border-color: var(--color-border-2) !important;
      background-color: var(--color-background-3);
    }
  }
`;

function CustomTextField({
  label,
  id,
  value,
  width,
  type = "text",
  defaultValue,
  onChange,
  disabled,
  register,
  required,
  helperText,
  error,
}) {
  return (
    <StyledTextField
      {...register}
      onChange={onChange}
      defaultValue={defaultValue}
      width={width}
      value={value}
      id={id}
      type={type}
      label={label}
      required={required}
      fullWidth
      disabled={disabled}
      variant="outlined"
      helperText={helperText}
      error={error}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default CustomTextField;
