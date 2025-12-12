import Link from "next/link";
import Image from "next/image";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export default function NotFound() {
  return (
    <div className="bg-beige-100 flex h-screen flex-col items-center justify-center">
      <div className="relative h-32 w-44">
        <Image
          fill
          sizes="176px"
          loading="eager"
          src="/status-message.png"
          alt="Sleeping robot"
        />
      </div>

      <h1 className="text-grey-900 text-xl font-bold">404. That&apos;s an error.</h1>
      <p className="text-sm">The requested URL could not be found.</p>
      <Link
        href="/"
        className="bg-grey-900 hover:bg-grey-900/70 focus:bg-grey-900/70 mt-3.5 flex items-center gap-2 rounded-md px-5 py-3 text-xs font-bold text-white">
        Return Home
        <ArrowUturnLeftIcon width={18} height={18} />
      </Link>
    </div>
  );
}
