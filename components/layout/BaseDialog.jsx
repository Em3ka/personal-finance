import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/Dialog";
import XIcon from "@/assets/icon-close-modal.svg";

export default function BaseDialog({ open, title, message, children, onCancel }) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent
        showCloseButton={false}
        className="w-140 gap-5 rounded-xl px-5 py-6 md:gap-5 md:p-8">
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold md:text-[2rem]">{title}</DialogTitle>
          <DialogClose asChild>
            <button
              className="hover:bg-grey-900 inline-flex size-[25px] cursor-pointer appearance-none items-center justify-center rounded-full transition-colors hover:text-white"
              aria-label="Close dialog">
              <XIcon className="size-6" aria-hidden={true} />
            </button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription>{message}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
