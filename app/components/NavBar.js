"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ShareChartButton from "@/components/ShareChartButton";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (targetPath) => {
    if (pathname === targetPath) {
      router.replace(targetPath);
    } else {
      router.push(targetPath);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#801DEB] border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-6">
        <Image
          src="/assets/Logotype-white.png"
          alt="Vicunous Logo"
          width={120}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        <div className="flex gap-4">
          {/* <button
            onClick={() => handleNavClick("/rent-vs-buy")}
            className={`text-md font-medium transition-colors ${
              pathname === "/rent-vs-buy"
                ? "text-black hover:cursor-pointer"
                : "text-white hover:text-[#D0A4FF] hover:cursor-pointer"
            }`}
          >
            Rent vs Buy Calculator
          </button> */}

          {/* <button
            onClick={() => handleNavClick("/mortgage")}
            className={`text-md font-medium transition-colors ${
              pathname === "/mortgage"
                ? "text-black hover:cursor-pointer"
                : "text-white hover:text-[#D0A4FF] hover:cursor-pointer"
            }`}
          >
            Mortgage Calculator
          </button> */}

          <button
            onClick={() => handleNavClick("/sell-house")}
            className={`text-md font-medium transition-colors ${
              pathname === "/sell-house"
                ? "text-black hover:cursor-pointer"
                : "text-white hover:text-[#D0A4FF] hover:cursor-pointer"
            }`}
          >
            Sell Your House
          </button>

          <button
            onClick={() => handleNavClick("/sell-business")}
            className={`text-md font-medium transition-colors ${
              pathname === "/sell-business"
                ? "text-black hover:cursor-pointer"
                : "text-white hover:text-[#D0A4FF] hover:cursor-pointer"
            }`}
          >
            Sell Your Business
          </button>

          <button
            onClick={() => handleNavClick("/valuation")}
            className={`text-md font-medium transition-colors ${
              pathname === "/valuation"
                ? "text-black hover:cursor-pointer"
                : "text-white hover:text-[#D0A4FF] hover:cursor-pointer"
            }`}
          >
            Business Valuation
          </button>
        </div>
      </div>

      {/* <ShareChartButton /> */}
    </nav>
  );
}
