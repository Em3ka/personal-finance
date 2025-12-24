import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isSameMonth, parseISO } from "date-fns";

/**
 * Combines multiple class name values intelligently.
 * - Uses `clsx` to conditionally join class names.
 * - Uses `tailwind-merge` to resolve conflicting Tailwind classes (e.g. `p-2` vs `p-4`).
 *
 * @example
 * cn("p-2", isActive && "bg-blue-500") // "p-2 bg-blue-500"
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a JavaScript Date object into a readable string.
 * Example output: "03 Nov 2025"
 *
 * @param {Date} date - A valid Date instance.
 * @returns {string}
 */
export function formatDate(date) {
  return format(date, "dd MMM yyyy");
}

/**
 * Checks if a given numeric amount represents an expense.
 * An expense is defined as a negative value.
 *
 * @param {number} amount
 * @returns {boolean}
 */
export function isExpense(amount) {
  return Math.sign(amount) === -1;
}

/**
 * Calculates total spending for the current month based on a list of transactions.
 * - Assumes each transaction has a `date` (ISO string) and `amount`.
 * - Sums only transactions that occur in the same month as the first one in the list.
 *
 * @param {Array<{ date: string, amount: number }>} transactions
 * @returns {number} Total amount spent in the same month as the first transaction.
 */
export function getSpentThisMonth(transactions) {
  if (!transactions.length) return 0;
  const referenceDate = parseISO(transactions[0].date);

  return transactions.reduce((sum, tx) => {
    const txDate = parseISO(tx.date);
    return isSameMonth(referenceDate, txDate) ? sum + tx.amount : sum;
  }, 0);
}

/**
 * Converts a string into a URL-friendly "slug".
 * - Lowercases all characters.
 * - Trims surrounding whitespace.
 * - Replaces spaces with hyphens.
 *
 * @param {string} str
 * @returns {string}
 *
 * @example
 * slugify("My New Budget") // "my-new-budget"
 */
export function slugify(str) {
  return str.toLowerCase().trim().replace(/\s+/g, "-");
}

/**
 * Capitalize the first letter of a word.
 *
 * @param {string} word
 * @returns {string}
 */
export function capFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Formats a numeric value as USD currency (e.g., "$1,234.56").
 *
 * @param {number | string} amount - The amount to format.
 * @param {Object} [options] - Optional formatting options. Intl.NumberFormat options can be passed.
 * @returns {string} A formatted currency string.
 */
export function formatCurrency(amount, options = {}) {
  return Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
    minimumFractionDigits: options.minimumFractionDigits ?? 2,
  });
}

/**
 * Returns a new array containing only the first `count` elements of the given array.
 *
 * @param {Array} arr - The array to limit.
 * @param {number} count - Optional: The maximum number of items to include. Default: 4
 * @returns {Array} A new array with up to the first `count` elements.
 */
export function limitArray(arr, count = 4) {
  return arr.slice(0, count);
}

/**
 * Generates a random decimal number between min and max, rounded to two decimal places.
 *
 * @param {number} [min=1000] - The minimum number (inclusive).
 * @param {number} [max=10000] - The maximum number (exclusive).
 * @returns {number} A random number rounded to two decimal places.
 */
export function generateRandomStartingBalance(min = 1000, max = 10000) {
  const randomValue = Math.random() * (max - min) + min;
  return Number(randomValue.toFixed(2));
}

/**
 * Prevents default keyboard behavior for plus (+) and minus (-) keys.
 * @param {KeyboardEvent} event - The keyboard event to evaluate.
 */
export function preventPlusMinusKeys(event) {
  if (
    event.code === "Minus" ||
    event.key === "-" ||
    event.code === "Add" ||
    event.key === "+"
  ) {
    event.preventDefault();
  }
}

/**
 * Maps a Supabase error to a user-friendly domain message.
 *
 * This function translates low-level database errors (e.g. RLS violations)
 * into messages that are safe and meaningful to show in the UI.
 * @param {object|null} error - The error object returned by Supabase.
 * @param {"create"|"edit"|"delete"} action - The action the user attempted.
 * @param {string} [resource='item'] - The domain resource name involved in the action (e.g. "pot", "budget")
 * @returns {{ success: false, message: string } | null}
 * A standardized failure object when an error exists, or null if no error
 *   was provided.
 * */
export function mapSupabaseError(error, action, resource = "item") {
  if (!error) return null;

  switch (error.code) {
    case "42501":
      return {
        success: false,
        message: `You don't have permission to ${action} this ${resource}.`,
      };

    case "23505":
      return {
        success: false,
        message: `A ${resource} with this name already exists.`,
      };

    default:
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
  }
}

/**
 * Handle Supabase response by mapping error and checking affected row count.
 *
 * @param {object|null} error - Supabase error object or null.
 * @param {Array|number|null} affected - Updated rows array OR count of affected rows.
 * @param {string} action - The user action, e.g., "delete", "edit", "create".
 * @param {string} resource - The resource name, e.g., "pot", "budget".
 * @returns {{ success: false, message: string } | null}
 *   Returns a failure object if error or zero rows affected, else null.
 */
export function handleSupabaseResponse(error, affected, action, resource) {
  if (error) {
    return mapSupabaseError(error, action, resource);
  }

  console.log(affected);

  // No rows affected, likely due to RLS filtering
  if (
    (Array.isArray(affected) && affected.length === 0) ||
    (typeof affected === "number" && affected === 0)
  ) {
    return {
      success: false,
      message: `You don't have permission to ${action} this ${resource}.`,
    };
  }

  return null;
}
