import { SidebarProvider } from "./SidebarContext";

export default function Sidebar({ defaultOpen = false, children }) {
  return <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>;
}
