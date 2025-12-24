import Link from "next/link";
import CaretRightIcon from "@/assets/icon-caret-right.svg";

export default function CardHeading({
  children,
  title,
  as: Tag,
  url = "#",
  className = "",
  wrapperClassName = "",
  urlLabel = "See all",
}) {
  return (
    <div className={`space-y-5 ${wrapperClassName}`}>
      <div className={`flex items-center justify-between ${className}`}>
        <Tag className="text-xl font-bold">{title}</Tag>
        <div className="text-grey-500 hover:text-grey-500/70 flex items-center gap-3 transition-colors">
          {url !== "#" && (
            <>
              <Link className="text-sm" href={url}>
                {urlLabel}
              </Link>
              <CaretRightIcon />
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
