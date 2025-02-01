import { memo } from "react";

import { Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { inputValidator } from "../utils/InputValidator";

const FormImagePreview = memo(({ images, setImages, deleteImage }) => {
  // console.log(images);
  return (
    <>
      {images.length > 0 && (
        <div className="flex gap-x-4 p-2 mt-4 bg-slate-100 overflow-x-scroll rounded-md">
          {Array.from(images).map((image, index) => {
            return (
              <Box
                key={index}
                className="relative h-[100px] aspect-video shrink-0 rounded shadow-md"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="投稿画像"
                  className="w-full h-full inset-0 object-cover rounded"
                />
                <CancelIcon
                  onClick={() => {
                    if (deleteImage) {
                      deleteImage(index);
                    } else {
                      setImages(images.filter((_, i) => i !== index));
                    }
                  }}
                  className="absolute top-0 right-0 cursor-pointer text-gray-500 hover:text-red-700"
                />
              </Box>
            );
          })}
        </div>
      )}
    </>
  );
});

export default FormImagePreview;
