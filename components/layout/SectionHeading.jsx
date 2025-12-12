export default function SectionHeading({ title, children }) {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between">
      <h1 className="text-[32px] font-bold">{title}</h1>
      {children}
    </header>
  );
}
