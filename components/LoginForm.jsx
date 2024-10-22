import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";

const LoginForm = ({ status, setEmail, setPassword, onSubmit }) => {
  return (
    <>
      <h1 className="text-center text-2xl">ログイン</h1>
      <form>
        <TextInput
          type="email"
          name="email"
          placeholder="メールアドレス"
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextInput
          type="password"
          name="password"
          placeholder="パスワード"
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {status && <p className="text-center text-red-600">{status}</p>}
        <SubmitButton text="ログイン" onSubmit={onSubmit} />
      </form>
    </>
  );
};

export default LoginForm;
