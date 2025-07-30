import Container from "@/layout/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const networks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/?locale=it_IT",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-facebook-icon lucide-facebook"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-instagram-icon lucide-instagram"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/GabrielePre11",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-github-icon lucide-github"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/prestano-gabriele/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-linkedin-icon lucide-linkedin"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Top 5 Genres", href: "/#top-5-genres" },
      { name: "Games", href: "/games" },
      { name: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Library",
    links: [
      { name: "New Arrivals", href: "/new-arrivals" },
      { name: "Most Popular", href: "/popular" },
      { name: "Browse by Genre", href: "/genres" },
      { name: "Recommended Reads", href: "/recommended" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Help Center", href: "/help" },
      { name: "Report a Problem", href: "/report" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "Our Story", href: "/about" },
      { name: "Meet the Team", href: "/team" },
      { name: "Blog", href: "/blog" },
      { name: "Terms & Privacy", href: "/terms" },
    ],
  },
];

const currentYear = new Date();

export default function Footer() {
  return (
    <footer className="left-0 bottom-0 w-full bg-bg-secondary mt-10 pt-5">
      <Container>
        {/*=========== Logo & Description ===========*/}
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-14">
          <div className="flex flex-col gap-2">
            {/*=========== Logo ===========*/}
            <Link
              href={"/"}
              className="flex items-center gap-2 md:gap-3.5 w-max"
            >
              <Image
                src={"/logo.png"}
                alt="GameShelf Logo"
                width={50}
                height={50}
                className="size-12 md:size-14"
              ></Image>
              <h2 className="text-2xl lg:text-3xl">GameShelf</h2>
            </Link>

            {/*=========== Description ===========*/}
            <p className="text-[1rem] lg:text-lg text-text-muted max-w-[300px] lg:max-w-[320px]">
              A cozy corner for book lovers and game explorers — discover, play,
              and enjoy a world where stories and adventures come to life.
            </p>

            {/*=========== Networks ===========*/}
            <ul className="flex items-center flex-wrap gap-3 mt-2">
              {networks.map((network) => (
                <li key={network.name} aria-label={`${network.name}'s Icon`}>
                  <a
                    href={network.href}
                    target="_blank"
                    className="grid place-items-center p-1.5 bg-bg border border-border rounded-lg transition-colors duration-300 hover:bg-bg/60"
                    aria-label={`${network.name} Icon`}
                    role="link"
                  >
                    {network.svg}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/*=========== Footer Links ===========*/}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-11 mt-6 md:mt-0">
            {footerLinks.map((footerLink) => (
              <li key={footerLink.title} className="flex flex-col gap-2">
                <h3 className="text-2xl">{footerLink.title}</h3>
                <ul className="flex flex-col space-y-1">
                  {footerLink.links.map((link) => (
                    <li
                      key={link.name}
                      className="text-[1rem] lg:text-lg text-text-muted hover:underline"
                    >
                      <Link href={`${link.href}`}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/*=========== Footer Bottom ===========*/}
        <div className="flex items-center flex-wrap justify-between gap-2 border-t-2 border-zinc-400 mt-5 py-5 text-[1rem] md:text-lg lg:text-xl text-muted">
          {/*=========== Copyright ===========*/}
          <p>{`© ${currentYear.getFullYear()} GameShelf. All rights reserved.`}</p>

          {/*=========== Author ===========*/}
          <p className="flex items-center gap-1">
            Built by
            <a
              href="https://www.linkedin.com/in/prestano-gabriele/"
              target="_blank"
              className="text-primary hover:underline"
            >
              Prestano Gabriele
            </a>
          </p>

          {/*=========== Terms of Service & Privacy Policy ===========*/}
          <div className="flex items-center gap-1.5">
            <p className="flex items-center gap-2 text-text-muted">
              Powered by
              <a
                href="https://rawg.io/"
                className="text-primary"
                target="_blank"
              >
                RAWG
              </a>
            </p>
            <Image
              src={"/rawg-logo.jpg"}
              alt="RAWG Logo"
              width={100}
              height={100}
              loading="lazy"
              className="size-10 objcect-contain aspect-square rounded-lg border border-border transition-all duration-300 hover:scale-105 hover:brightness-105"
            ></Image>
          </div>
        </div>
      </Container>
    </footer>
  );
}
