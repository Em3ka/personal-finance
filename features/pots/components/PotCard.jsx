import PotStats from "./PotStats";
import Heading from "@/components/layout/Heading";
import ActionButton from "@/components/ui/ActionButton";
import Progressbar from "@/components/layout/Progressbar";
import OverflowMenu from "@/components/layout/OverflowMenu";

export default function PotCard({ name, saved, theme, target, actions }) {
  const { onAdd, onEdit, onDelete, onWithdraw } = actions;

  return (
    <article className="grid gap-8 rounded-xl bg-white p-6">
      <Heading as="h2" title={name} color={theme}>
        <OverflowMenu
          content={[
            { title: "Edit Budget", onClick: onEdit },
            { title: "Delete Budget", onClick: onDelete },
          ]}
        />
      </Heading>

      <PotStats target={target} amount={saved}>
        <Progressbar min={saved} maximum={target} theme={theme} />
      </PotStats>

      <div className="grid grid-cols-2 gap-4">
        <ActionButton variant="neutral" onClick={onAdd}>
          +Add Money
        </ActionButton>

        <ActionButton variant="neutral" onClick={onWithdraw}>
          Withdraw
        </ActionButton>
      </div>
    </article>
  );
}
