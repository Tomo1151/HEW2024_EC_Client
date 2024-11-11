import Link from "next/link";
import { Button, TextField } from "@mui/material";

const LoginForm = ({ status, setEmail, setPassword, onSubmit }) => {
  return (
    <>
      <h1 className="text-center font-bold text-3xl pb-8 mt-8">ログイン</h1>
      <form onSubmit={onSubmit}>
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
          // variant="standard"
          autoFocus
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          label="パスワード"
          placeholder="[0-9a-zA-Z]{8,}"
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          sx={{ display: "block", width: "80%", mx: "auto", my: "1em" }}
          // variant="standard"
          fullWidth
        />
        <p className="text-center text-red-600">{status}</p>
        <Button
          variant="contained"
          type="submit"
          sx={{ display: "block", width: "25%", mx: "auto", my: "2em" }}
        >
          ログイン
        </Button>
        <p className="text-center">
          アカウントをお持ちでない方は
          <Link href="/register" className="text-blue-400 hover:underline">
            登録
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
