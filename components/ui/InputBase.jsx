import { cn } from "@/utils/helpers";
import { isValidElement } from "react";

/**
 * InputBase Component
 *
 * A flexible text input component that supports optional left and right adornments.
 * You can pass either a React component, a React element, or a string (e.g., emoji or character)
 * as `leftIcon` or `rightIcon`.
 *
 * Example usage:
 * ```jsx
 * <InputBase leftIcon="@" placeholder="Username" />
 * <InputBase rightIcon="🔍" placeholder="Search" />
 * <InputBase leftIcon={FiUser} rightIcon={FiLock} placeholder="Password" />
 * ```
 *
 * @param {ComponentType | ReactElement | string} [leftIcon] - Optional icon or text to display on the left side of the input.
 * @param {ComponentType | ReactElement | string} [rightIcon] - Optional icon or text to display on the right side of the input.
 * @param {boolean} [fullWidth=false] - If true, input takes full width of its container.
 * @param {object} [props.*] - Any other standard HTML `<input>` attributes (e.g., placeholder, value, onChange).
 *
 * @returns {JSX.Element} The rendered input component.
 */
export default function InputBase({ leftIcon, rightIcon, fullWidth = false, ...props }) {
  function renderIcon(icon, position) {
    if (!icon) return null;

    const baseClasses =
      position === "left"
        ? "absolute inset-y-0 left-0 flex items-center pl-5"
        : "absolute inset-y-0 right-0 flex items-center pr-5";

    if (isValidElement(icon)) {
      return <div className={baseClasses}>{icon}</div>;
    }

    if (typeof icon === "function" || typeof icon === "object") {
      const IconComponent = icon;
      return (
        <div className={baseClasses}>
          <IconComponent className="size-5" />
        </div>
      );
    }

    if (typeof icon === "string") {
      return (
        <div className={baseClasses}>
          <span className="text-sm text-gray-500">{icon}</span>
        </div>
      );
    }

    return null;
  }

  const hasLeft = Boolean(leftIcon);
  const hasRight = Boolean(rightIcon);

  return (
    <div className={cn("relative w-full", fullWidth ? "" : "max-w-[20rem]")}>
      {renderIcon(leftIcon, "left")}
      <input
        {...props}
        className={cn(
          "disabled:text-grey-900/50 placeholder-beige-500 disabled:border-grey-300 border-beige-500 disabled:bg-grey-100 focus:ring-beige-500/50 w-full rounded-lg border px-5 py-3 text-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70",
          hasLeft && "pl-10",
          hasRight && "pr-10",
        )}
      />
      {renderIcon(rightIcon, "right")}
    </div>
  );
}
