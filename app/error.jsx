"use client";

import Image from "next/image";

export default function Error({ error, reset }) {
  return (
    <div className="bg-beige-100 flex h-screen flex-col items-center justify-center gap-4">
      <Image src="/broken-robot.png" height={300} width={400} alt="broken robot" />
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <button
        onClick={reset}
        className="bg-grey-900 cursor-pointer rounded px-4 py-2 text-white">
        Try again
      </button>
    </div>
  );
}
