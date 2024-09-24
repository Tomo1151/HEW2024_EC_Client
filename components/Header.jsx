import Image from "next/image";

import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="bg-main-theme h-[80px] fixed inset-0 flex justify-between z-50">
      <NavBar />
    </header>
  );
};

export default Header;
