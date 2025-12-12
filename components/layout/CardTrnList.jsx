export default function CardTrnList({ data, render }) {
  return (
    <div className="space-y-5">
      <ul>
        {data.map((item, i) => (
          <li
            key={item.id}
            className={`border-grey-500/15 border-t ${i === 0 ? "mt-0 border-t-0 pt-0" : "mt-3 pt-3"}`}>
            {render(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
