import { getPots } from "@/lib/data-service";
import { PotsProvider } from "../PotsProvider";

import PotsLayout from "./PotsLayout";

export default async function Pots() {
  const potsData = await getPots();

  return (
    <PotsProvider pots={potsData}>
      <PotsLayout />
    </PotsProvider>
  );
}
