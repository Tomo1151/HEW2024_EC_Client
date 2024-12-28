"use client";

import Image from "next/image";
import Link from "next/link";
import LinkButton from "./LinkButton";
import { useUserContext } from "@/context/UserContext";

const NavBar = () => {
  const { activeUser, logout } = useUserContext();

  return (
    <>
      <Link href="/" className="h-auto">
        <Image
          src="/appri_logo.png"
          width={150}
          height={150}
          alt="アプリロゴ"
          priority={true}
          className="mx-4 px-2 pt-3 drop-shadow-md cursor-pointer"
        />
      </Link>
      <nav className="grow h-full">
        <ul className="flex justify-end h-full items-center mr-8">
          {activeUser ? (
            <>
              <li className="mr-8">
                <LinkButton
                  href={`/users/${activeUser?.username}`}
                  value="プロフィール"
                />
              </li>

              <li className="">
                <LinkButton href="/" value="ログアウト" onClick={logout} />
              </li>
            </>
          ) : (
            <>
              <li className="mr-8">
                <LinkButton href="/register" value="アカウントを作成" />
              </li>

              <li className="">
                <LinkButton href="/login" value="ログイン" />
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
