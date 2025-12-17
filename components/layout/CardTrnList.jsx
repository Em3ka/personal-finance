import InlineEmpty from "./InlineEmpty";

export default function CardTrnList({ data, render, emptyMessage = "No items found." }) {
  if (!data || data.length === 0) {
    return <InlineEmpty message={emptyMessage} />;
  }

  return (
    <ul>
      {data.map((item, i) => (
        <li
          key={item.id}
          className={`border-grey-500/15 border-t ${i === 0 ? "mt-0 border-t-0 pt-0" : "mt-3 pt-3"}`}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}
