import Image from "next/image";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/16/solid";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-4 bg-base-100">
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="/logo.png"
          width={32}
          height={32}
          alt="Tomato Time Logo"
          className="-rotate-15"
        />
        <span className="text-3xl font-display mt-1">Tomato</span>
      </Link>
      {/* TODO: Mobile Nav Menu: */}
      {/* <Bars3Icon className="size-8 text-base-content-200/85" /> */}
    </nav>
  );
};

export default Navbar;
