"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MobileMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (value: boolean) => void;
}) {
  const links = [
    { name: "Home", href: "/" },
    { name: "Genres", href: "/#top-5-categories" },
    { name: "Games", href: "/games" },
    { name: "Wishlist", href: "/wishlist" },
  ];

  const pathName = usePathname();

  const closeMenuOnClick = () => {
    setIsMenuOpen(false);
  };

  //========= Close the mobile navbar on scroll =========//
  const closeSearchOnScroll = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  useEffect(() => {
    window.addEventListener("scroll", closeSearchOnScroll);
    return () => window.removeEventListener("scroll", closeSearchOnScroll);
  }, [closeSearchOnScroll]);

  return (
    <nav className="fixed lg:hidden inset-0 h-screen bg-bg-secondary z-30 overflow-hidden">
      {/*=========== Logo & Close Button ===========*/}
      <div className="flex items-center justify-between px-5 py-4">
        {/*=========== Logo ===========*/}
        <h3 className="flex items-center gap-3.5 text-2xl drop-shadow-2xl drop-shadow-primary">
          <Image
            src={"/logo.png"}
            alt="GameShelf Logo"
            width={100}
            height={100}
            className="size-16 animate-pulse"
          ></Image>
          GameShelf
        </h3>

        {/*=========== Close Button ===========*/}
        <button
          className="grid place-items-center border border-border rounded-full bg-bg p-2 transition-colors duration-200 hover:bg-bg/70"
          aria-label="Close Mobile Menu"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x-icon lucide-x transition duration-300 hover:rotate-180"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <ul className="grid grid-cols-1 gap-10 pt-16 px-5">
        {links.map((link) => (
          <li
            key={link.name}
            className="text-4xl md:text-5xl w-max"
            onClick={closeMenuOnClick}
          >
            <Link
              href={link.href}
              className={`transition-colors duration-100 hover:text-primary-hover ${
                link.href === pathName ? "text-primary" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
