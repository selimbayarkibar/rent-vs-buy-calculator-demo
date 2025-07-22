"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import calculators from "@/data/calculators.json";

const MotionDiv = dynamic(
  () => import("framer-motion").then((fm) => fm.motion.div),
  { ssr: false }
);

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
    <main className="min-h-screen py-6 px-4 lg:px-24 bg-[#f9fbfc]">
      <div className="text-center mb-12">
        <Image
          src="/assets/Logotype-color.png"
          alt="Vicunous Logo"
          width={200}
          height={64}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-violate-500">
          Vicunous Calculators
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Access calculators and educational content to optimize your wealth
          management
        </p>
      </div>

      {/* Responsive Calculator Layout */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {calculators.map((calc, index) => (
          <MotionDiv
            key={calc.title}
            variants={fadeIn(index * 0.2)}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.05 }}
            className="transform transition duration-300 w-full lg:w-1/3"
          >
            <Card
              href={calc.href}
              src={calc.image}
              title={calc.title}
              desc={calc.description}
            />
          </MotionDiv>
        ))}
      </div>
    </main>
  );
}
