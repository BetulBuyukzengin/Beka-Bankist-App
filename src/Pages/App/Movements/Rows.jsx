/* eslint-disable react/prop-types */
import React from "react";
import DetailTableRow from "./DetailTableRow";
import MainTableRow from "./MainTableRow";
// import PropTypes from "prop-types";

export default function Rows(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <MainTableRow open={open} setOpen={setOpen} row={row} />
      <DetailTableRow row={row} open={open} />
    </React.Fragment>
  );
}
