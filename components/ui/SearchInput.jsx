import InputBase from "./InputBase";
import Spinner from "../layout/Spinner";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchInput({ isLoading = false, ...props }) {
  return (
    <InputBase
      {...props}
      aria-busy={isLoading}
      wrapperClassName="lg:max-w-[20rem]"
      rightIcon={isLoading ? <Spinner color="dark" /> : MagnifyingGlassIcon}
    />
  );
}
