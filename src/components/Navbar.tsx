"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { name: "home", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "photos", href: "/photos" },
  { name: "listening", href: "/listening" },
  { name: "reading", href: "/reading" },
  { name: "friends", href: "/friends" },
  { name: "word cloud", href: "/word-cloud" },
  { name: "about", href: "/about" },
  { name: "cv", href: "/cv" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuPanel = (
    <div
      className="fixed inset-0 z-[9999]"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="absolute top-0 right-0 w-64 h-full bg-white shadow p-4 pt-16 z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col mt-10">
          {pages.map((page) => {
            const isActive =
              pathname === page.href || pathname.startsWith(`${page.href}/`);
            return (
              <li key={page.href} className="py-1">
                <Link
                  href={page.href}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full h-full hover:bg-[darkorange] ${
                    isActive ? "bg-[darkorange] font-bold" : "font-normal"
                  }`}
                >
                  {page.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <nav className="relative">
      {/* Desktop sidebar */}
      <ul className="hidden md:flex md:flex-col md:w-48 p-4">
        {pages.map((page) => {
          const isActive =
            pathname === page.href || pathname.startsWith(`${page.href}/`);

          return (
            <li key={page.href} className="py-1">
              <Link
                href={page.href}
                className={`block w-full h-full hover:bg-[darkorange] ${
                  isActive ? "bg-[darkorange] font-bold" : "font-normal"
                }`}
              >
                {page.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-2 right-2 p-2 z-[10001]"
        aria-label="Toggle menu"
      >
        {!isOpen ? (
          <span className="block text-2xl">☰</span>
        ) : (
          <span className="block text-2xl">✕</span>
        )}
      </button>

      {mounted && isOpen && createPortal(menuPanel, document.body)}
    </nav>
  );
}
