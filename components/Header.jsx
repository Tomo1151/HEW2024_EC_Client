import Image from "next/image";

import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="bg-main-theme h-[80px] sticky inset-0 flex justify-between">
      <NavBar />
    </header>
  );
};

export default Header;
