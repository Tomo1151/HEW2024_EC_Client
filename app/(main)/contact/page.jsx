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
          <h1 className="text-center m-[1em] text-3xl">お問い合わせフォーム</h1>
          <div className="w-4/5 mx-auto mb-[2em]">
            <p>
              本フォームでは、本サービスに関するお問い合わせを受け付けております。
              ご利用中に不具合やバグ等を発見された場合は、ここからご報告いただけますと幸いです。
              また、以下のような内容についても受け付けております。
            </p>
            <ul className="list-disc ml-[2em] my-[1em]">
              <li>不適切なコンテンツの報告</li>
              <li>アカウントや投稿に関するお問い合わせ</li>
              <li>サービスの利用方法に関するご質問</li>
            </ul>
            <p>
              いただいたお問い合わせには順次対応いたしますが、内容によっては回答までにお時間をいただく場合がございます。予めご了承ください。
            </p>
          </div>

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
