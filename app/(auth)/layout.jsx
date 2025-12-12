import Logo from "@/components/layout/Logo";
import BrandSidePanel from "@/components/layout/BrandSidePanel";

export default function Layout({ children }) {
  return (
    <>
      <Logo />
      <main className="grid h-screen max-xl:px-4 xl:grid-cols-[560px_1fr] xl:gap-10">
        <BrandSidePanel />
        <div className="mx-auto w-full max-w-140 space-y-8 self-center rounded-xl bg-white p-8 *:w-full">
          {children}
        </div>
      </main>
    </>
  );
}
