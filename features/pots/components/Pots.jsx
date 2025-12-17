import PotsLayout from "./PotsLayout";
import { getPots } from "@/lib/data-service";
import { PotsProvider } from "../PotsProvider";

export default async function Pots() {
  const potsData = await getPots();

  return (
    <PotsProvider pots={potsData}>
      <PotsLayout />
    </PotsProvider>
  );
}
