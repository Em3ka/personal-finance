export default function Spinner({ color = "light" }) {
  const colorScheme = {
    light: "border-beige-100",
    dark: "border-grey-500/50",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`bg-grey size-5 animate-spin rounded-full border-2 border-t-transparent ${colorScheme[color]}`}
    />
  );
}
