import SignupForm from "./components/SignupForm";

export const metadata = {
  title: "Sign up",
  description:
    "Create an account to start managing your budgets, bills, transactions, and savings—all in one simple finance dashboard.",
};

export default function Page() {
  return <SignupForm />;
}
