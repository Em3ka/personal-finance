export default function PageEmpty({ title, message }) {
  return (
    <div
      aria-live="polite"
      className="mx-auto grid items-center gap-2 self-center rounded p-8 text-center">
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      <p className="text-sm whitespace-pre-line">{message}</p>
    </div>
  );
}
