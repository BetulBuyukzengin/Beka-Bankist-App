/* eslint-disable react/prop-types */
import { Box, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  backgroundColor: "var(--color-background-2  )",
  border: "1px solid var(--color-gray)",
  color: "var(--color-text)",
  boxShadow: 24,
  p: "3rem 2rem",
  height: "50rem",
  scrollY: "auto",
  maxHeight: "30rem",
  maxWidth: "70rem",
  overflowY: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  "&:focus-visible": {
    outline: "none",
  },
};

function CustomModal({
  children,
  setOpen,
  open,
  title,
  paddingSize,
  clearParamsCallBack,
  shouldClearParamsOnClose = false,
}) {
  return (
    <Modal
      open={open}
      onClose={() => {
        if (shouldClearParamsOnClose) clearParamsCallBack();
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, padding: paddingSize }}>
        <CloseIcon
          sx={{ right: "1rem", top: "1rem", position: "absolute" }}
          onClick={() => {
            setOpen(false);
            if (shouldClearParamsOnClose) clearParamsCallBack();
          }}
        />
        {title && (
          <Typography
            variant="h4"
            sx={{ marginBottom: "1rem", textAlign: "center" }}
          >
            {title}
          </Typography>
        )}

        {children}
      </Box>
    </Modal>
  );
}

export default CustomModal;
