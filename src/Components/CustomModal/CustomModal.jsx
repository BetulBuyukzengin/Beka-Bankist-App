/* eslint-disable react/prop-types */
import { Box, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { media31_25em, media48em } from "../../Constants/constants";
import { useSpring, animated } from "@react-spring/web";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  backgroundColor: "var(--color-background-2  )",
  border: "1px solid var(--color-gray)",
  borderRadius: "5px",
  color: "var(--color-text)",
  boxShadow: 24,
  p: "3rem 2rem",
  height: "50rem",
  scrollY: "auto",
  maxHeight: "90dvh",
  maxWidth: "70rem",
  overflowY: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  "&:focus-visible": {
    outline: "none",
  },
};

const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

function CustomModal({
  children,
  setOpen,
  open,
  title,
  paddingSize,
  clearParamsCallBack,
  shouldClearParamsOnClose = false,
  modalBoxStyles,
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
      <Fade in={open}>
        <Box
          sx={{
            ...style,
            padding: paddingSize,
            ...modalBoxStyles,
          }}
        >
          <CloseIcon
            sx={{
              right: "1rem",
              top: "1rem",
              position: "absolute",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(false);
              if (shouldClearParamsOnClose) clearParamsCallBack();
            }}
          />
          {title && (
            <Typography
              variant="h4"
              sx={{
                marginBottom: "1rem",
                textAlign: "center",
                fontWeight: "bold",
                [media48em]: {
                  fontSize: "1rem",
                },
                [media31_25em]: {
                  fontSize: ".9rem",
                },
              }}
            >
              {title}
            </Typography>
          )}
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}

export default CustomModal;
