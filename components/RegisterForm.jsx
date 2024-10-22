import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";

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
      <form>
        <TextInput
          type="username"
          name="username"
          placeholder="ユーザー名"
          autoComplete="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
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
          autoComplete="new-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="パスワード"
        />
        {status && <p className="text-center text-red-600">{status}</p>}
        <SubmitButton text="新規登録" onSubmit={onSubmit} />
      </form>
    </>
  );
};

export default RegisterForm;
