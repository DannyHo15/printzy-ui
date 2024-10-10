import Link from 'next/link';
import Image from 'next/image';
// import dynamic from "next/dynamic";
import SearchBar from './SearchBar';
import Menu from './Menu';
import NavIcons from './NavIcons';
// import NavIcons from "./NavIcons";

// const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  return (
    <div className="h-20 px-8 relative">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide">PRINTZY</div>
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/2 xl:w-1/5 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={24} height={24} />
            <div className="text-2xl tracking-wide">PRINTZY</div>
          </Link>
        </div>
        <div className="w-1/2 xl:w-3/5 flex items-center justify-center">
          <SearchBar />
        </div>
        {/* RIGHT */}
        <div className="w-1/2 xl:w-1/5 flex items-center justify-end">
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
