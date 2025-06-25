"use client";
import Image from "next/image";
import { SETTINGS_PAGE_ID } from "./SettingsPage";

const SettingsButton = () => {
  const handleClick = () => {
    const target = document.getElementById(SETTINGS_PAGE_ID);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Open Settings"
      className={`
        absolute bottom-0 right-0 opacity-50 m-4
        transition-transform duration-150 ease-in-out hover:animate-spin active:scale-75
        hover:cursor-pointer
        size-8
        `}
    >
      <Image
        src="/images/gear-outline.png"
        alt="Settings Icon"
        height={32}
        width={32}
      />
    </button>
  );
};

export default SettingsButton;
