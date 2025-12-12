import Sidebar from "./sidebar";
import { cookies } from "next/headers";

export default async function AppSidebar() {
  const isCollapsed = (await cookies()).get("sidebar-state")?.value === "true";

  return (
    <Sidebar defaultOpen={isCollapsed}>
      <Sidebar.Header />
      <Sidebar.List />
      <Sidebar.Trigger />
    </Sidebar>
  );
}
