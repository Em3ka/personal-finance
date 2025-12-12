import "./globals.css";
import { Public_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/Sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const publicSans = Public_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Personal Finance",
    default: "Personal Finance",
  },
  description:
    "Take control of your money with ease. Track expenses, set budgets, manage savings, and reach your financial goals — all in one smart personal finance app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={publicSans.className}>
      <body className="text-grey-900 bg-beige-100 antialiased">
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
