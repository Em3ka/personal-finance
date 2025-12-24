"use client";

import Image from "next/image";

export default function Error({ error, reset }) {
  return (
    <div className="bg-beige-100 flex h-screen flex-col items-center justify-center gap-4">
      <div className="relative h-[300] w-[400]">
        <Image
          fill
          sizes="400"
          loading="eager"
          alt="broken robot"
          src="/broken-robot.png"
        />
      </div>
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <button
        onClick={reset}
        className="bg-grey-900 cursor-pointer rounded px-4 py-2 text-white">
        Try again
      </button>
    </div>
  );
}
