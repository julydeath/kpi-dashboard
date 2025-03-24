import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center min-h-screen">
      <div className="flex flex-col px-40 py-20 text-center mx-auto items-center border border-gray-500 rounded-lg ">
        <div className="text-gray-800 font-bold text-4xl pb-10">
          404 Not Found
        </div>
        <Link
          href="/"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
