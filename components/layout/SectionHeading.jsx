export default function SectionHeading({ title, children }) {
  return (
    <header className="flex flex-wrap items-center justify-between">
      <h1 className="text-[2rem] font-bold">{title}</h1>
      {children}
    </header>
  );
}
