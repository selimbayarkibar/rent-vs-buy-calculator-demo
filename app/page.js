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
    <main className="min-h-screen py-6 px-4 lg:px-24 bg-gradient-to-br from-violate-500 via-violate-100 to-violate-800">
      <div className="text-center mb-12">
        <Image
          src="/assets/Logotype-color.png"
          alt="Vicunous Logo"
          width={200}
          height={64}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-violate-800">
          Vicunous Calculators
        </h1>
        <p className="text-black text-lg mt-2">
          Access calculators and educational content to optimize your wealth
          management
        </p>
      </div>

      {/* Responsive Calculator Layout */}
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {calculators.map((calc, index) => (
          <MotionDiv
            key={calc.title}
            variants={fadeIn(index * 0.2)}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.05 }}
            className="h-full"
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
