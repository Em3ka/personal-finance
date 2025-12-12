import InputBase from "./InputBase";
import SpinnerMini from "../layout/SpinnerMini";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchInput({ isLoading = false, ...props }) {
  return (
    <InputBase
      {...props}
      rightIcon={isLoading ? <SpinnerMini color="dark" /> : MagnifyingGlassIcon}
    />
  );
}
