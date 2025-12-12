import BrandLogo from "@/assets/logo.svg";

export default function Logo() {
  return (
    <header className="bg-grey-900 flex w-full items-center justify-center self-start rounded-b-lg px-10 py-6 xl:hidden">
      <BrandLogo width={122} height={22} alt="Finance logo" />
    </header>
  );
}
