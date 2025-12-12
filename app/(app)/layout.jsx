import AppSidebar from "@/components/layout/AppSidebar";

export default function Layout({ children }) {
  return (
    <main className="grid h-screen grid-rows-[1fr_auto] lg:grid-cols-[auto_1fr]">
      <AppSidebar />
      <section className="overflow-y-auto px-4 pt-6 pb-[76px] sm:px-6 sm:pt-8 sm:pb-[104px] lg:px-10 lg:py-8">
        {children}
      </section>
    </main>
  );
}
