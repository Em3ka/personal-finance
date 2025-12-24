"use client";

import { useState } from "react";
import InputBase from "./InputBase";
import { cn } from "@/utils/helpers";
import EyeIcon from "@/assets/icon-show-password.svg";
import EyeSlashIcon from "@/assets/icon-hide-password.svg";

export default function PasswordInput({ ...props }) {
  const [visible, setVisible] = useState(false);
  const inputType = visible ? "text" : "password";

  return (
    <InputBase
      {...props}
      type={inputType}
      rightIcon={() => (
        <button
          type="button"
          disabled={props.disabled}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}>
          {visible ? (
            <EyeSlashIcon
              className={cn("size-5", props.disabled ? "text-grey-300" : "text-gray-900")}
            />
          ) : (
            <EyeIcon
              className={cn("size-5", props.disabled ? "text-grey-300" : "text-gray-900")}
            />
          )}
        </button>
      )}
    />
  );
}
