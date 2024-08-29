// import { Paper } from "@mui/material";
// import CustomButton from "../../../../Components/CustomButton/CustomButton";
// import { useState } from "react";
// import CustomModal from "../../../../Components/CustomModal/CustomModal";
// import AddProfileImgPage from "./AddProfileImgPage";

// function AddProfileImg() {
//   const [openAddProfileModal, setOpenAddProfileModal] = useState(false);
//   return (
//     <>
//       <Paper
//         sx={{
//           padding: "2rem",
//           display: "flex",
//           flexDirection: "column",
//           gap: "1rem",
//           backgroundColor: "var(--color-background)",
//           border: "1px solid var(--color-gray)",
//           color: "var(--color-text)",
//         }}
//       >
//         <p>Add profile image</p>
//         <CustomButton
//           style={{ alignSelf: "center" }}
//           buttonText="Add İmage"
//           onClick={() => setOpenAddProfileModal(true)}
//         />
//       </Paper>
//       <CustomModal open={openAddProfileModal} setOpen={setOpenAddProfileModal}>
//         <AddProfileImgPage />
//       </CustomModal>
//     </>
//   );
// }

// export default AddProfileImg;
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  return (
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
      {/* { ? "Update profile image" : "Add profile image"} */}
      Add profile image
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Button>
    </Paper>
  );
}

export default AddProfileImgForm;
