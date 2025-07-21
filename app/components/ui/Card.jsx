import Image from "next/image";

export default function Card({ href, src, title, desc, className = "" }) {
  return (
    <div
      className={`p-6 h-full flex flex-col justify-between border border-gray-200 shadow-md rounded-xl bg-white hover:shadow-lg ${className}`}
    >
      <div className="flex-1 flex flex-col items-center">
        <div className="justify-center mb-4 relative">
          <Image
            src={src}
            alt={title}
            height={120}
            width={120}
            className="rounded-md"
          />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900 text-center">
          {title}
        </h2>
        <p className="text-gray-600 mb-6 text-sm text-center">{desc}</p>
      </div>
      {href && (
        <a href={href} className="mt-6 block">
          <button className="w-full bg-[#801deb] text-white py-2 px-4 rounded-md hover:bg-[#5400b0] transition hover:cursor-pointer">
            Open Calculator
          </button>
        </a>
      )}
    </div>
  );
}
