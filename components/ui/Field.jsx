import { cloneElement, isValidElement } from "react";

export default function Field({
  label,
  htmlFor,
  children,
  message,
  onFieldChange,
  isError = false,
}) {
  const messageId = message ? `${htmlFor}-message` : undefined;

  const childWithAria = isValidElement(children)
    ? cloneElement(children, {
        "aria-invalid": isError,
        "aria-describedby": messageId,
        onChange: (e) => {
          children.props?.onChange?.(e);
          onFieldChange?.(htmlFor, e.target.value);
        },
      })
    : children;

  return (
    <div className="relative grid gap-1">
      <label htmlFor={htmlFor} className="text-grey-500 text-xs font-bold">
        {label}
      </label>
      {childWithAria}
      {message && (
        <p
          id={messageId}
          className={`absolute right-0 -bottom-5 text-end text-xs ${isError ? "text-red-500" : "text-grey-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
