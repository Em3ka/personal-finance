import Link from "next/link";

export default function FieldDescription({ to = "#", linkLabel, children }) {
  return (
    <p className="text-grey-500 text-center text-sm">
      {children}{" "}
      {linkLabel && (
        <Link href={to} className="text-grey-900 font-bold underline underline-offset-4">
          {linkLabel}
        </Link>
      )}
    </p>
  );
}
