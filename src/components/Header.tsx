"use client";

import Container from "@/layout/Container";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import MobileSearch from "./MobileSearch";
import MobileMenu from "./MobileMenu";
import Searchbar from "./Searchbar";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const headerActions = [
    {
      label: "Search",
      svg: (
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
          className="lucide lucide-search-icon lucide-search"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      ),
      onClick: () => {
        setIsSearchOpen((prev) => !prev);
      },
    },

    {
      label: "Mobile Menu",
      isClosedSVG: (
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
          className="lucide lucide-menu-icon lucide-menu"
        >
          <path d="M4 12h16" />
          <path d="M4 18h16" />
          <path d="M4 6h16" />
        </svg>
      ),
      isOpenSVG: (
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
          className="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      ),
      onClick: () => {
        setIsMenuOpen((prev) => !prev);
      },
    },
  ];

  const links = [
    { name: "Home", href: "/" },
    { name: "Genres", href: "/#top-5-genres" },
    { name: "Games", href: "/games" },
    { name: "Wishlist", href: "/wishlist" },
  ];

  /*=========== States ===========*/
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerScrolled, setIsHeaderScolled] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleHeaderScroll = () => {
      if (window.scrollY > 50) {
        setIsHeaderScolled(true);
      } else {
        setIsHeaderScolled(false);
      }
    };

    window.addEventListener("scroll", handleHeaderScroll);
    return () => {
      window.removeEventListener("scroll", handleHeaderScroll);
    };
  }, [headerScrolled]);

  return (
    <header
      className={`fixed top-0 left-0 bg-bg-secondary w-full z-10 ${
        headerScrolled ? "shadow-lg shadow-primary/20" : "shadow-none"
      }`}
    >
      <Container className="flex items-center justify-between py-2">
        {/*=========== Logo & Navigation (desktop) ===========*/}
        <div className="flex items-center gap-10">
          {/*=========== Logo ===========*/}
          <Link href={"/"} className="flex items-center gap-2 md:gap-3.5">
            <Image
              src={"/logo.png"}
              alt="GameShelf Logo"
              width={50}
              height={50}
              className="size-10 md:size-12"
            ></Image>
            <h2 className="text-lg lg:text-xl">GameShelf</h2>
          </Link>

          {/*=========== Navigation (desktop) ===========*/}
          <ul className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={`${link.href}`}
                  className={`transition-colors duration-100 hover:text-primary-hover ${
                    link.href === pathName ? "text-primary" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/*=========== Searchbar & Header Actions ===========*/}
        <div className="flex items-center gap-3 lg:gap-0">
          {/*=========== Searchbar (desktop) ===========*/}
          <Searchbar />

          {/*=========== Clerk Signed In ===========*/}
          <SignedIn>
            <div className="grid place-items-center lg:pl-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "border border-border rounded-full",
                  },
                }}
              />
            </div>
          </SignedIn>

          {/*=========== Header Actions ===========*/}
          <div className="flex items-center gap-2.5">
            {/*=========== Sign Up Button (Mobile) ===========*/}
            <SignUpButton mode="modal">
              <button className="grid sm:hidden place-items-center p-1.5 bg-bg border border-border rounded-lg transition-all duration-200 hover:bg-bg/50 ease-in-out">
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
                  className="lucide lucide-log-in-icon lucide-log-in"
                >
                  <path d="m10 17 5-5-5-5" />
                  <path d="M15 12H3" />
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                </svg>
              </button>
            </SignUpButton>

            {headerActions.map((button) => (
              <button
                key={button.label}
                className={`grid ${
                  button.label === "Search"
                    ? "sm:hidden"
                    : `${button.label === "Mobile Menu" ? "lg:hidden" : ""}`
                } place-items-center p-1.5 bg-bg border border-border rounded-lg transition-all duration-200 hover:bg-bg/50 ease-in-out`}
                aria-label={`${button.label}'s Icon`}
                onClick={button.onClick}
              >
                {button.isClosedSVG
                  ? isMenuOpen
                    ? button.isOpenSVG
                    : button.isClosedSVG
                  : button.svg}
              </button>
            ))}
          </div>

          {/*=========== Clerk Signed Out ===========*/}
          <SignedOut>
            <div className="hidden sm:flex items-center gap-2 lg:pl-3">
              {/*=========== Sign Up Button (sm - md - lg) ===========*/}
              <SignUpButton mode="modal">
                <button className="grid place-items-center bg-bg px-3 py-1 border border-border rounded-lg transition-colors duration-200 hover:bg-bg/50">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>

        {/*=========== MobileSearch Component ===========*/}
        {
          <MobileSearch
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
        }

        {/*=========== MobileMenu Component ===========*/}
        {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
      </Container>
    </header>
  );
}
