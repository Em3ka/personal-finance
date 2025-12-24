"use client";

import { usePots } from "../PotsProvider";
import { deletePot } from "@/lib/actions";
import { POT_DIALOGS } from "@/utils/constants";
import PotUpsertForm from "./forms/PotUpsertForm";
import PotUpdateForm from "./forms/PotUpdateForm";
import BaseDialog from "@/components/layout/BaseDialog";
import ConfirmDialog from "@/components/layout/ConfirmDialog";

export default function PotsDialogs() {
  const { closeDialog, dialog, pots } = usePots();

  switch (dialog.type) {
    case "add":
    case "withdraw": {
      const { title, message, updateType } = POT_DIALOGS[dialog.type];

      return (
        <BaseDialog
          open
          onCancel={closeDialog}
          title={title(dialog.data.name)}
          message={message}>
          <PotUpdateForm
            mode={updateType}
            onSuccess={closeDialog}
            formData={{
              id: dialog.data.id,
              total: dialog.data.total,
              target: dialog.data.target,
            }}
          />
        </BaseDialog>
      );
    }

    case "add-new":
    case "edit": {
      const { title, message, formVariant } = POT_DIALOGS[dialog.type];

      return (
        <BaseDialog open onCancel={closeDialog} title={title()} message={message}>
          <PotUpsertForm
            mode={formVariant}
            onSuccess={closeDialog}
            formData={
              dialog.type === "edit"
                ? {
                    potId: dialog.data.id,
                    initialTheme: dialog.data.theme,
                    initialPotName: dialog.data.name,
                    initialTargetAmount: dialog.data.target,
                    usedColors: pots.map((p) => p.theme),
                  }
                : { usedColors: pots.map((p) => p.color) }
            }
          />
        </BaseDialog>
      );
    }

    case "delete":
      return (
        <ConfirmDialog
          open
          action={deletePot}
          onCancel={closeDialog}
          title={`Delete ‘${dialog.data.name}’ ?`}
          loadingText={`Deleting ${dialog.data.name} pot...`}
          message={`Are you sure you want to delete this ${dialog.data.name.toLowerCase()}? 
          This action cannot be reversed, and all the data inside it will be removed forever.`}>
          {({ formAction, formId }) => (
            <form id={formId} action={formAction}>
              <input type="hidden" name="potId" value={dialog.data.id} />
            </form>
          )}
        </ConfirmDialog>
      );

    default:
      return null;
  }
}
