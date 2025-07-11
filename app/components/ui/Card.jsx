export default function Card({ children, href, className = "" }) {
  return (
    <div
      className={`p-6 h-full flex flex-col justify-between border border-gray-200 shadow-md rounded-xl bg-white hover:shadow-lg ${className}`}
    >
      <div className="flex-1">{children}</div>
      {href && (
        <a href={href} className="mt-6 block">
          <button className="w-full bg-[#801deb] text-white py-2 px-4 rounded-md hover:bg-[#631ba3] transition hover:cursor-pointer">
            Open Calculator
          </button>
        </a>
      )}
    </div>
  );
}
