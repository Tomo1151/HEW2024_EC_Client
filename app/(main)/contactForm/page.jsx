"use client";

import MainColumnHeader from "@/components/MainColumnHeader";
import { useUserContext } from "@/context/UserContext";
import { useState } from "react";

import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const contactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("　");
  const [isFetching, setIsFetching] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { contactForm } = useUserContext();

  async function handleSubmit(event) {
    setIsFetching(true);
    event.preventDefault();
    const data = await contactForm(name, email, message);

    setIsSent(data.success);
    console.log(data.success);

    if (!data.success) {
      setStatus(data.message);
      setIsFetching(false);
      return;
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">お問い合わせ</h3>
      </MainColumnHeader>
      {isSent ? (
        <>
          <div className="m-[2em]">
            <p className="text-center">ご意見ありがとうございました</p>
            <div className="mx-auto my-[2em]">
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
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="text-center m-[2em] text-3xl">お問い合わせフォーム</h1>
          <TextField
            fullWidth
            name="name"
            type="text"
            label="お名前"
            placeholder="見場太郎"
            autoComplete="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            sx={{ display: "block", width: "80%", mx: "auto", my: "1em" }}
          />

          <TextField
            fullWidth
            name="email"
            type="email"
            label="メールアドレス"
            placeholder="example@example.com"
            autoComplete="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            sx={{ display: "block", width: "80%", mx: "auto", my: "1em" }}
          />

          <TextField
            fullWidth
            name="message"
            type="text"
            label="お問い合わせ内容"
            autoComplete="message"
            multiline
            minRows={3}
            maxRows={3}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            sx={{ display: "block", width: "80%", mx: "auto", my: "1em" }}
          />

          <p className="text-center text-red-600">{status}</p>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isFetching}
            sx={{
              display: "block",
              width: "fit-content",
              mx: "auto",
              my: "2em",
            }}
          >
            送信
          </LoadingButton>
        </form>
      )}
    </ThemeProvider>
  );
};

export default contactForm;
