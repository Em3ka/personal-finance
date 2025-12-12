import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import EllipsisVertical from "@/assets/icon-ellipsis.svg";

export default function OverflowMenu({ content }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Overflow menu"
          className="flex cursor-pointer items-center justify-center rounded-md p-2">
          <EllipsisVertical aria-hidden={true} className="text-grey-300 size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {content.map((c) => (
          <DropdownMenuItem
            key={c.title}
            onClick={c.onClick}
            className="cursor-pointer"
            variant={
              c.variant ||
              (c.title.toLowerCase().includes("delete") ? "destructive" : "default")
            }>
            {c.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
