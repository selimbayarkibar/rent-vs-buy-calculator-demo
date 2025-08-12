"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ShareChartButton from "@/components/ShareChartButton";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (targetPath) => {
    if (pathname === targetPath) {
      router.replace(targetPath);
    } else {
      router.push(targetPath);
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: "/sell-house", label: "Sell Your House" },
    { path: "/sell-business", label: "Sell Your Business" },
    { path: "/valuation", label: "Business Valuation" },
    { path: "/assessment", label: "Fundraising Readiness Assessment" },
    { path: "/mpAssessment", label: "Multi Page Assessment" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-violate-500 border-b border-gray-200 px-4 py-3 shadow-sm">
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Image
              src="/assets/Logotype-white.png"
              alt="Vicunous Logo"
              width={120}
              height={40}
              className="cursor-pointer"
              onClick={() => router.push("/")}
            />

            <div className="flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-base font-medium transition-colors whitespace-nowrap ${
                    pathname === item.path
                      ? "text-black hover:cursor-pointer"
                      : "text-white hover:text-violet-100 hover:cursor-pointer"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {/* <ShareChartButton /> */}
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex justify-between items-center">
          <Image
            src="/assets/Logotype-white.png"
            alt="Vicunous Logo"
            width={100}
            height={33}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-violet-100 focus:outline-none hover:cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-12 left-0 right-0 z-40 bg-violate-500 border-b border-gray-200 shadow-lg lg:hidden">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-left px-3 py-3 text-base font-medium transition-colors rounded-md ${
                  pathname === item.path
                    ? "bg-violate-500 text-white"
                    : "text-white hover:bg-violate-800 hover:text-white hover:cursor-pointer"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
