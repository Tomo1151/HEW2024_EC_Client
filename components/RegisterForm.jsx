import Link from "next/link";
import { Button, TextField } from "@mui/material";

const RegisterForm = ({
  status,
  setUsername,
  setEmail,
  setPassword,
  onSubmit,
}) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center">新規登録</h1>
      <form onSubmit={onSubmit}>
        <TextField
          type="username"
          name="username"
          label="ユーザー名"
          placeholder="username"
          autoComplete="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          sx={{ display: "block", width: "80%", mx: "auto", my: "1em" }}
          fullWidth
        />
        <TextField
          type="email"
          name="email"
          label="メールアドレス"
          placeholder="example@example.com"
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          sx={{ display: "block", width: "80%", mx: "auto", my: "1em" }}
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          autoComplete="new-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          label="パスワード"
          placeholder="[0-9a-zA-Z]{8,}"
          sx={{ display: "block", width: "80%", mx: "auto", my: "1em" }}
          fullWidth
        />
        <p className="text-center text-red-600">{status}</p>
        <Button
          type="submit"
          variant="contained"
          sx={{ display: "block", width: "25%", mx: "auto", my: "2em" }}
        >
          新規登録
        </Button>
        <p className="text-center">
          アカウントをお持ちの方は
          <Link href="/login" className="text-blue-400 hover:underline">
            ログイン
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
