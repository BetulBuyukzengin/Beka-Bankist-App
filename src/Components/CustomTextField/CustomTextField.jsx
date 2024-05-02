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
    color: var(--color-text);
  }
  & > div {
    color: var(--color-text);
    & > fieldset {
      border-color: var(--color-border-2);
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
}) {
  return (
    <StyledTextField
      onChange={onChange}
      defaultValue={defaultValue}
      width={width}
      value={value}
      id={id}
      type={type}
      label={label}
      fullWidth
      disabled={disabled}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default CustomTextField;
