import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUploadImg, useUser } from "../../../../services/userServices";
import CustomButton from "../../../../Components/CustomButton/CustomButton";

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
  console.log(user.user_metadata);
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
        }}
      >
        {user.user_metadata.image
          ? "Update profile image"
          : "Add profile image"}
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          disabled={isPending}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
            multiple
          />
        </Button>
        <CustomButton disabled={isPending} buttonText="denden" type="submit" />
      </Paper>
    </form>
  );
}

export default AddProfileImgForm;
