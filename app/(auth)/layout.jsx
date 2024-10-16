export default function AuthLayout({ children }) {
  return (
    <main className="relative w-[600px] h-[50dvh] min-h-[550px] bg-sub-theme p-8 mt-8 mx-auto shadow-lg">
      {children}
    </main>
  );
}
