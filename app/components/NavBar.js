"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ShareChartButton from "@/components/ShareChartButton";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (targetPath) => {
    if (pathname === targetPath) {
      // Force reset by clearing search params
      router.replace(targetPath);
    } else {
      router.push(targetPath);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#801DEB] border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex gap-4">
        <button
          onClick={() => handleNavClick("/")}
          className={`text-md font-medium transition-colors ${
            pathname === "/"
              ? "text-black hover:cursor-pointer"
              : "text-white hover:text-[#D0A4FF] hover:cursor-pointer"
          }`}
        >
          Rent vs Buy Calculator
        </button>
        <button
          onClick={() => handleNavClick("/mortgage")}
          className={`text-md font-medium transition-colors ${
            pathname === "/mortgage"
              ? "text-black hover:cursor-pointer"
              : "text-white hover:text-[#D0A4FF] hover:cursor-pointer"
          }`}
        >
          Mortgage Calculator
        </button>
        <button
          onClick={() => handleNavClick("/sell-house")}
          className={`text-md font-medium transition-colors ${
            pathname === "/sell-house"
              ? "text-black hover:cursor-pointer"
              : "text-white hover:text-[#D0A4FF] hover:cursor-pointer"
          }`}
        >
          Sell Your House Calculator
        </button>
        <button
          onClick={() => handleNavClick("/sell-business")}
          className={`text-md font-medium transition-colors ${
            pathname === "/sell-business"
              ? "text-black hover:cursor-pointer"
              : "text-white hover:text-[#D0A4FF] hover:cursor-pointer"
          }`}
        >
          Sell Your Business Calculator
        </button>
      </div>

      {/* <ShareChartButton /> */}
    </nav>
  );
}
