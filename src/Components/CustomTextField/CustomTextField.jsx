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
    @media (max-width: 48em) {
      font-size: 0.9rem;
    }
    @media (max-width: 31.25em) {
      font-size: 0.8rem;
    }
  }
  & > div {
    color: var(--color-text);
    & > fieldset {
      border-color: var(--color-border-2);
    }
  }
  & div > input {
    text-transform: ${(props) =>
      props.texttransform === "basic" ? "" : "capitalize"};

    &:disabled {
      -webkit-text-fill-color: var(--color-text) !important;
      color: var(--color-text) !important;
    }
    &:disabled + fieldset {
      border-color: var(--color-border-2) !important;
      background-color: var(--color-background-3);
    }
    @media (max-width: 48em) {
      font-size: 1rem;
    }
    @media (max-width: 31.25em) {
      font-size: 0.9rem;
    }
  }
  @media (max-width: 48em) {
    width: ${({ textFieldStyles }) =>
      textFieldStyles?.width || "80% !important"};
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
  placeholder,
  inputProps, //! mui input props
  texttransform,
  textFieldStyles,
  variant,
}) {
  return (
    <StyledTextField
      {...register}
      textFieldStyles={textFieldStyles}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      width={width}
      texttransform={texttransform}
      value={value}
      id={id}
      type={type}
      label={label}
      required={required}
      fullWidth
      disabled={disabled}
      variant={variant}
      helperText={helperText}
      error={error}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={inputProps}
    />
  );
}

export default CustomTextField;
