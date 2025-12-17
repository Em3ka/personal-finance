"use client";

import PotCard from "./PotCard";
import PotsDialogs from "./PotsDialogs";
import { usePots } from "../PotsProvider";
import { PlusIcon } from "@heroicons/react/24/solid";
import PageEmpty from "@/components/layout/PageEmpty";
import ActionButton from "@/components/ui/ActionButton";
import SectionHeading from "@/components/layout/SectionHeading";

export default function PotsLayout() {
  const { openDialog, pots } = usePots();

  return (
    <>
      <SectionHeading title="Pots">
        <ActionButton icon={PlusIcon} onClick={() => openDialog("add-new")}>
          Add New Pot
        </ActionButton>
      </SectionHeading>

      {pots.length > 0 ? (
        <div className="grid-cards-comfy grid gap-x-6 gap-y-6 self-start">
          {pots.map((p) => {
            const actions = {
              onAdd: () => openDialog("add", p),
              onEdit: () => openDialog("edit", p),
              onDelete: () => openDialog("delete", p),
              onWithdraw: () => openDialog("withdraw", p),
            };

            return (
              <PotCard
                key={p.id}
                name={p.name}
                theme={p.theme}
                saved={p.total}
                target={p.target}
                actions={actions}
              />
            );
          })}
        </div>
      ) : (
        <PageEmpty
          title="No Pots Yet"
          message={`Pots help you set money aside for specific goals.
            Create your first pot to start saving.`}
        />
      )}

      <PotsDialogs />
    </>
  );
}
