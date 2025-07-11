"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";

const MotionDiv = dynamic(
  () => import("framer-motion").then((fm) => fm.motion.div),
  { ssr: false }
);

const calculators = [
  {
    title: "Sell Your House Calculator",
    description: "Calculate potential savings with V when selling your house.",
    href: "/sell-house",
    image: "/assets/sell-house.png",
  },
  {
    title: "Sell Your Business Calculator",
    description:
      "Calculate potential savings with V when selling your business.",
    href: "/sell-business",
    image: "/assets/sell-business.png",
  },
  {
    title: "Small Business Valuation Calculator",
    description:
      "Get an estimated valuation range for your business based on industry standards and key metrics.",
    href: "/valuation",
    image: "/assets/valuation.png",
  },
];

const fadeIn = (delay) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  },
});

export default function Home() {
  return (
    <main className="min-h-screen py-16 px-4 lg:px-24 bg-[#f9fbfc]">
      <div className="text-center mb-12">
        <Image
          src="/assets/Logotype-color.png"
          alt="Vicunous Logo"
          width={200}
          height={64}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800">
          Vicunous Calculators
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Access calculators and educational content to optimize your wealth
          management
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {calculators.map((calc, index) => (
          <MotionDiv
            key={calc.title}
            variants={fadeIn(index * 0.2)}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.05 }}
            className="transform transition duration-300"
          >
            <Card href={calc.href}>
              <div className="flex justify-center mb-4">
                <Image
                  src={calc.image}
                  alt={calc.title}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 text-center">
                {calc.title}
              </h2>
              <p className="text-gray-600 mb-6 text-sm">{calc.description}</p>
            </Card>
          </MotionDiv>
        ))}
      </div>
    </main>
  );
}
