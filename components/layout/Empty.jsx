import Image from "next/image";

export default function Empty({ title, message }) {
  return (
    <div
      aria-live="polite"
      className="mx-auto flex max-w-sm flex-col items-center gap-2 text-center">
      <div className="relative h-32 w-44">
        <Image
          fill
          sizes="176px"
          loading="eager"
          alt="Sleeping robot"
          src="/status-message.png"
        />
      </div>
      <p className="text-lg font-bold tracking-tight">{title}</p>
      <p className="text-sm whitespace-pre-line">{message}</p>
    </div>
  );
}
