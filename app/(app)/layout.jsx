import AppSidebar from "@/components/layout/AppSidebar";

export default function Layout({ children }) {
  return (
    <main className="grid h-screen grid-rows-[1fr_auto] lg:grid-cols-[auto_1fr]">
      <AppSidebar />
      <section className="grid grid-rows-[min-content_1fr] gap-y-8 overflow-y-auto px-4 pt-6 pb-19 sm:px-6 sm:pt-8 sm:pb-26 lg:px-10 lg:py-8">
        {children}
      </section>
    </main>
  );
}
