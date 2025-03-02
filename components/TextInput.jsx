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
        onWheel={(e) => e.target.blur()}
        slotProps={{
          input: {
            endAdornment: (
              <>
                {value && (
                  <>
                    {isValid ? (
                      <CheckCircleOutlineRoundedIcon
                        sx={{
                          color: "primary.main",
                        }}
                      />
                    ) : (
                      <AddCircleOutlineRoundedIcon
                        sx={{
                          transform: "rotate(45deg)",
                          color: "error.main",
                        }}
                      />
                    )}
                  </>
                )}
              </>
            ),
          },
        }}
      />
    </Box>
  );
};

export default TextInput;
