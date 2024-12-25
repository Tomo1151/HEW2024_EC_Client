"use client";

import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const onSubmit = (e) => {
    if (!e.target[0].value) e.preventDefault();
  };

  return (
    <form action="/search" method="get" onSubmit={onSubmit}>
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
    </form>
  );
};

export default SearchBar;
