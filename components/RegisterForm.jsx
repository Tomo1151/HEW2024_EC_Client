import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";

const RegisterForm = ({
  status,
  setUsername,
  setEmail,
  setPassword,
  isFetching,
  onSubmit,
}) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center pb-8 mt-8">新規登録</h1>
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
          autoFocus
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
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isFetching}
          sx={{ display: "block", width: "fit-content", mx: "auto", my: "2em" }}
        >
          新規登録
        </LoadingButton>
        <p className="text-center pb-8">
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
