import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUploadImg, useUser } from "../../../../services/userServices";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import { media84_37em } from "../../../../Constants/constants";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddProfileImgForm() {
  const [file, setFile] = useState("");
  const { handleSubmit } = useForm();
  const { isPending, mutateAsync: uploadImg } = useUploadImg();
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const onSubmit = async () => {
    await uploadImg(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "var(--color-background)",
          border: "1px solid var(--color-gray)",
          color: "var(--color-text)",
          justifyContent: "center",
          alignItems: "center",
          "@media (max-width:48em)": {
            padding: ".8rem",
            fontSize: "1rem",
          },
          "@media (max-width:31.25em)": {
            fontSize: ".8rem",
          },
        }}
      >
        <p>
          {user?.user_metadata?.image
            ? "Update profile image"
            : "Add profile image"}
        </p>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          disabled={isPending}
          size="small"
          sx={{
            // width: "30%",
            width: "40%",
            [media84_37em]: {
              width: "100%",
            },
            "@media (max-width:48em)": {
              fontSize: ".8rem",
            },
            "@media (max-width:31.25em)": {
              fontSize: ".7rem",
            },
            "&>span": {
              "@media (max-width:48em)": {
                marginRight: "3px",
                marginLeft: "0px",
              },
            },
          }}
        >
          {selectedFile ? "Selected" : "Choose image"}
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </Button>
        <CustomButton
          disabled={isPending}
          buttonText="Upload Image"
          type="submit"
          style={{
            // width: "30%",
            width: "40%",
            [media84_37em]: {
              width: "100%",
            },
            "@media (max-width:48em)": {
              fontSize: ".8rem",
            },
            "@media (max-width:31.25em)": {
              fontSize: ".7rem",
            },
          }}
        />
      </Paper>
    </form>
  );
}

export default AddProfileImgForm;
