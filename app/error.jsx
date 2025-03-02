"use client";

import { Button } from "@mui/material";

export default function Error() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>エラーが発生しました</h1>
      <p>問題が発生しました。一度トップに戻ってください</p>
      <Button
        variant="contained"
        sx={{
          display: "block",
          width: "fit-content",
          mx: "auto",
          my: "2em",
        }}
        href="/"
      >
        トップに戻る
      </Button>
    </div>
  );
}
