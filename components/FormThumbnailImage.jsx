import { forwardRef, memo } from "react";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const FormThumbnailImage = memo(({ images, onChange }) => {
  return (
    <Button
      component="label"
      variant="contained"
      className="relative"
      disabled={images.length >= 4}
      sx={[
        {
          display: "block",
          position: "relative",
          backgroundColor: "#f0f0f0",
          color: "#bbb",
          borderRadius: ".375rem",
          width: { xs: "100%", sm: "auto" },
          height: "13.25em",
          aspectRatio: "16/9",
          mx: "auto",
          my: 4,
          cursor: "pointer",
        },
        images.length > 0 && {
          backgroundImage: `url(${URL.createObjectURL(images[0])})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      ]}
    >
      <input
        id="thumbnail"
        name="images"
        type="file"
        className="invisible absolute w-full inset-0 h-full"
        accept="image/*"
        // ref={ref}
        onChange={onChange}
        multiple
        disabled={images.length >= 4}
      />
      {images.length === 0 && (
        <p>
          サムネイル画像を追加{" "}
          <span className="text-red-500">
            <sup>(必須)</sup>
          </span>
        </p>
      )}
      <AddCircleOutlineIcon
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2rem",
        }}
      />
    </Button>
  );
});
export default FormThumbnailImage;
