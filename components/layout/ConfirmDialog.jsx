"use client";

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "../ui/Dialog";
import { useActionState, useId } from "react";
import { useToast } from "@/hooks/useToast";
import ActionButton from "../ui/ActionButton";
import XIcon from "@/assets/icon-close-modal.svg";

export default function ConfirmDialog({
  open,
  title,
  action,
  message,
  onCancel,
  children,
}) {
  const formId = useId();
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: null,
  });

  useToast(state, onCancel);

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent
        showCloseButton={false}
        className="w-[560px] gap-5 rounded-xl px-5 py-6 md:gap-5 md:p-8">
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold md:text-[32px]">{title}</DialogTitle>
          <DialogClose asChild>
            <button
              aria-label="Close dialog"
              className="hover:bg-grey-900 inline-flex size-[25px] cursor-pointer appearance-none items-center justify-center rounded-full hover:text-white">
              <XIcon aria-hidden={true} />
            </button>
          </DialogClose>
        </DialogHeader>

        <DialogDescription>{message}</DialogDescription>
        {typeof children === "function" ? children({ formAction, formId }) : null}

        <DialogFooter>
          <ActionButton
            form={formId}
            type="submit"
            variant="danger"
            className="w-full"
            disabled={isPending}>
            Yes, Confirm Deletion
          </ActionButton>

          <DialogClose asChild>
            <ActionButton variant="ghost" disabled={isPending} className="w-full">
              No, I want to go back
            </ActionButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
