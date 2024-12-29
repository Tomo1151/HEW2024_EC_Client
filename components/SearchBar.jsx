"use client";

import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const onSubmit = (e) => {
    if (!e.target[0].value) e.preventDefault();
  };

  return (
    <Box
      component="form"
      action="/search"
      method="get"
      onSubmit={onSubmit}
      sx={{
        borderRadius: ".5em",
      }}
    >
      <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
          htmlInput: { style: { padding: ".5em .25em" } },
        }}
        name="q"
        fullWidth
        placeholder="ポストやユーザーを検索"
        sx={{ backgroundColor: "white" }}
      />
    </Box>
  );
};

export default SearchBar;
