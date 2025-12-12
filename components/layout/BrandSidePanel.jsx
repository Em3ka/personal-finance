import BrandLogo from "@/assets/logo.svg";

export default function BrandSidePanel() {
  return (
    <div className="m-5 hidden flex-col rounded-xl bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_55%,rgba(0,0,0,0.6)_100%),url('/illustration-authentication.svg')] bg-cover bg-no-repeat p-10 xl:flex">
      <BrandLogo alt="Finance logo" width={122} height={22} />

      <div className="mt-auto space-y-6">
        <p className="text-[2rem] leading-[1.2] font-bold text-white">
          Keep track of your money and save for your future
        </p>
        <p className="text-sm text-white">
          Personal finance app puts you in control of your spending. Track
          transactions, set budgets, and add to savings pots easily.
        </p>
      </div>
    </div>
  );
}
