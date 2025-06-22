import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="m-auto h-full max-w-content flex justify-between items-center">
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
      </div>
    </nav>
  );
};

export default Navbar;
