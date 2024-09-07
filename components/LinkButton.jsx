"use client";

import Link from "next/link";

const LinkButton = ({ href, value }) => {
  return (
    <>
      <Link href={href}>
        <button className="bg-main-theme text-white font-bold py-2 px-4 rounded">
          {value}
        </button>
      </Link>
    </>
  );
};

export default LinkButton;
