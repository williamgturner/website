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
  { name: "about", href: "/about" },
  { name: "cv", href: "/cv" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ensure document is available for portal (avoid SSR mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  const menuPanel = (
    <div className="fixed inset-0 z-[9999] bg-opacity-50" onClick={() => setIsOpen(false)}>
      <div
        className="absolute top-0 left-0 w-64 h-full bg-white shadow p-4 z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="mb-4 p-2 rounded"
          aria-label="Close menu"
        >
          ✕
        </button>

        <ul className="flex flex-col">
          {pages.map((page) => {
            const isActive = pathname === page.href;
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
    <nav className="m-2">
      {/* Desktop sidebar */}
      <ul className="hidden md:flex md:flex-col md:w-48">
        {pages.map((page) => {
          const isActive = pathname === page.href;
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
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2"
          aria-label="Toggle menu"
        >
          {!isOpen ? <span className="block text-2xl">☰</span> : <span className="block text-2xl">✕</span>}
        </button>
      </div>

      {/* Portal the overlay/menu into document.body so it isn't constrained by ancestors */}
      {mounted && isOpen && createPortal(menuPanel, document.body)}
    </nav>
  );
}
