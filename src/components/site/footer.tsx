import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between py-2 px-4 bg-base-content-100 text-base-100/75">
      <span className="text-xs ">© 2025 Tomato </span>
      <Link
        href="https://github.com/alexmunoz502"
        className="flex gap-1 items-center"
      >
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
          width={16}
          height={16}
          alt="Github Icon"
        />
        <span className="">Open Source on Github</span>
      </Link>
    </footer>
  );
};

export default Footer;
