import Link from "next/link";

export default function DefaultButton({ link, children, onClick }) {
  const button = (
    <button
      className={`
				bg-main-theme
				text-white
				border-white
				font-bold px-6 py-2 rounded-lg duration-200 shadow-xl
				hover:bg-white
				hover:text-main-theme
				hover:border-main-theme
				`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return <>{link ? <Link href={link}>{button}</Link> : button}</>;
}
