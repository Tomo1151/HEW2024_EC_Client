import { Box, TextField } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import { inputValidator } from "@/utils/InputValidator";

const TextInput = ({
  type,
  id,
  name,
  rows,
  placeholder,
  label,
  onChange,
  sx,
  value,
  onKeyPress,
  multiline = false,
}) => {
  const isValid = inputValidator(name, value);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <TextField
        type={type}
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        label={label}
        onChange={onChange}
        sx={{ position: "relative", ...sx }}
        value={value}
        onKeyPress={onKeyPress}
        fullWidth
        multiline={multiline}
        variant="standard"
      />

      {value && (
        <>
          {isValid ? (
            <CheckCircleOutlineRoundedIcon
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-20%)",
                color: "primary.main",
              }}
            />
          ) : (
            <AddCircleOutlineRoundedIcon
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-20%) rotate(45deg)",
                color: "error.main",
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default TextInput;
