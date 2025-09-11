"use client"; // needed for hooks in components

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { name: "home", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "photos", href: "/photos" },
  { name: "listening", href: "/listening" },
  { name: "reading", href: "/reading" },
  { name: "about", href: "/about" },
  { name: "cv", href: "/cv" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="m-2 w-48">
      <ul className="flex flex-col">
        {pages.map((page) => {
          const isActive = pathname === page.href;
          return (
            <li key={page.href} className="py-1">
              <Link
                href={page.href}
                className={`block w-full h-full hover:bg-[purple] ${
                  isActive ? "font-bold" : "font-normal"
                }`}
              >
                {page.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
