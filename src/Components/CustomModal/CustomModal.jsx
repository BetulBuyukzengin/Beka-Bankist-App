/* eslint-disable react/prop-types */
import { Box, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "3rem 2rem",
  height: "50rem",
  scrollY: "auto",
  maxHeight: "30rem",
  maxWidth: "70rem",
  overflowY: "auto",

  "&:focus-visible": {
    outline: "none",
  },
};

function CustomModal({ children, setOpen, open, title }) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          variant="h4"
          sx={{ marginBottom: "1rem", textAlign: "center" }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
}

export default CustomModal;
