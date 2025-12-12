export default function SpinnerMini({ color = "light" }) {
  const colorScheme = {
    light: "border-beige-100",
    dark: "border-grey-500/50",
  };

  return (
    <div
      className={`bg-grey size-5 animate-spin rounded-full border-2 border-t-transparent ${colorScheme[color]}`}></div>
  );
}
