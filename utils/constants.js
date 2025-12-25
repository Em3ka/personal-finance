import BrandLogo from "@/assets/logo.svg";
import PotsIcon from "@/assets/icon-nav-pots.svg";
import HomeIcon from "@/assets/icon-nav-overview.svg";
import BudgetsIcon from "@/assets/icon-nav-budgets.svg";
import NavToggleIcon from "@/assets/icon-minimize-menu.svg";
import BillsIcon from "@/assets/icon-nav-recurring-bills.svg";
import TransactionsIcon from "@/assets/icon-nav-transactions.svg";

export const MAX_CHARS = 30;
export const PAGE_LIMIT = 10;

export const navLinks = [
  { name: "Overview", to: "/", icon: HomeIcon },
  { name: "Transactions", to: "/transactions", icon: TransactionsIcon },
  { name: "Budgets", to: "/budgets", icon: BudgetsIcon },
  { name: "Pots", to: "/pots", icon: PotsIcon },
  { name: "Recurring Bills", to: "/bills", icon: BillsIcon },
];

export const sidebarConfig = {
  width: {
    collapsed: 88,
    expanded: 300,
  },
  transitions: {
    sidebar: { type: "spring", stiffness: 260, damping: 20 },
    button: { type: "spring", stiffness: 260, damping: 20 },
    text: { duration: 0.2, delay: 0.4 },
  },
  branding: {
    Icon: BrandLogo,
    alt: "Finance logo",
    collapsed: {
      height: 22,
      width: 12,
    },
    expanded: {
      height: 22,
      width: 122,
    },
  },
  toggle: {
    Icon: NavToggleIcon,
    label: "Minimize Menu",
  },
};

export const categoryOptions = [
  { name: "All transactions", value: "all" },
  { name: "Entertainment", value: "entertainment" },
  { name: "Bills", value: "bills" },
  { name: "Groceries", value: "groceries" },
  { name: "Dining Out", value: "dining-out" },
  { name: "Lifestyle", value: "lifestyle" },
  { name: "Shopping", value: "shopping" },
  { name: "General", value: "general" },
  { name: "Personal Care", value: "personal-care" },
];

export const sortOptions = [
  { name: "Latest", value: "latest" },
  { name: "Oldest", value: "oldest" },
  { name: "A to Z", value: "name-asc" },
  { name: "Z to A", value: "name-desc" },
  { name: "Highest", value: "amount-asc" },
  { name: "Lowest", value: "amount-desc" },
];

export const trnColumns = [
  { key: "recipient", label: "Recipient / Sender" },
  { key: "category", label: "Category" },
  { key: "date", label: "Transaction Date" },
  { key: "amount", label: "Amount" },
];

export const billsColumns = [
  { key: "title", label: "Bill Title" },
  { key: "date", label: "Due Date" },
  { key: "amount", label: "Amount" },
];

export const colorSelections = [
  { name: "Beige", value: "#979289" },
  { name: "Grey", value: "#696969" },
  { name: "Green", value: "#277C78" },
  { name: "Yellow", value: "#F2CDAC" },
  { name: "Cyan", value: "#82C9D7" },
  { name: "Navy", value: "#626070" },
  { name: "Red", value: "#CC4A3F" },
  { name: "Purple", value: "#826CB0" },
  { name: "Turquoise", value: "#5E6F6F" },
  { name: "Brown", value: "#7A5A46" },
  { name: "Magenta", value: "#8A496B" },
  { name: "Blue", value: "#3D78A1" },
  { name: "Navy Grey", value: "#9BA6B4" },
  { name: "Army Green", value: "#72855D" },
  { name: "Gold", value: "#D5B853" },
  { name: "Orange", value: "#B66246" },
];

export const potActionLabels = {
  add: { text: "Confirm Addition", pendingText: "Confirming..." },
  withdraw: { text: "Confirm Withdrawal", pendingText: "Confirming..." },
  create: { text: "Add Pot", pendingText: "Adding Pot..." },
  edit: { text: "Save Changes", pendingText: "Saving changes..." },
};

export const budgetActionLabels = {
  create: { text: "Add Budget", pendingText: "Adding budget..." },
  edit: { text: "Save Changes", pendingText: "Saving changes..." },
};

export const statsVariant = {
  default: { color: "text-grey-500", text: "Total Saving" },
  add: { color: "text-green-500", text: "New Amount" },
  withdraw: { color: "text-red-500", text: "New Amount" },
};

export const POT_DIALOGS = {
  add: {
    title: (name) => `Add to ‘${name}’`,
    message: `Add money to your pot to keep it separate from your main balance. 
      As soon as you add this money, it will be deducted from your current balance.`,
    updateType: "add",
  },

  withdraw: {
    title: (name) => `Withdraw from ‘${name}’`,
    message: `Withdraw from your pot to put money back in your main balance. 
    This will reduce the amount you have in this pot.`,
    updateType: "withdraw",
  },

  "add-new": {
    title: () => "Add New Pot",
    message: `Create a pot to set savings targets. These can help keep you on track as you save for special purchases.`,
    formVariant: "create",
  },

  edit: {
    title: () => "Edit Pot",
    message: `If your saving targets change, feel free to update your pots.`,
    formVariant: "edit",
  },
};

export const SORT_DEFINITIONS = {
  latest: {
    column: "date",
    ascending: false,
    compare: (a, b) => new Date(b.date) - new Date(a.date),
  },
  oldest: {
    column: "date",
    ascending: true,
    compare: (a, b) => new Date(a.date) - new Date(b.date),
  },
  "name-asc": {
    column: "name",
    ascending: true,
    compare: (a, b) => a.name.localeCompare(b.name),
  },
  "name-desc": {
    column: "name",
    ascending: false,
    compare: (a, b) => b.name.localeCompare(a.name),
  },
  "amount-asc": {
    column: "amount",
    ascending: true,
    compare: (a, b) => Math.abs(b.amount) - Math.abs(a.amount),
  },
  "amount-desc": {
    column: "amount",
    ascending: false,
    compare: (a, b) => Math.abs(a.amount) - Math.abs(b.amount),
  },
};
