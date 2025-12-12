export default function Heading({ color, title, as: Tag = "h1", children }) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <span
          style={{ backgroundColor: color }}
          className="block size-4 rounded-full"></span>

        <Tag className="text-grey-900 text-xl font-bold">{title}</Tag>
      </div>
      {children}
    </div>
  );
}
