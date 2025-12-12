/**
 * Responsive, reusable table component.
 *
 * Renders a traditional HTML table layout on desktop and a stacked list layout on mobile.
 * Uses render props to fully control how each row is rendered.
 *
 * @example
 * ```jsx
 * <Table
 *   data={data}
 *   columns={[
 *     { key: "name", label: "Name" },
 *     { key: "amount", label: "Amount" },
 *   ]}
 *   renderDesktopRow={(item) => (
 *     <tr key={item.id}>
 *       <td className="px-6 py-4">{item.name}</td>
 *       <td className="px-6 py-4 text-end">{item.amount}</td>
 *     </tr>
 *   )}
 *   renderMobileRow={(item) => (
 *     <div key={item.id} className="p-4">
 *       <div className="flex justify-between">
 *         <span>{item.name}</span>
 *         <span>{item.amount}</span>
 *       </div>
 *     </div>
 *   )}
 *   emptyMessage="No transactions found."
 * />
 * ```
 *
 * @param {Array<Object>} data - Array of data objects to display in the table.
 * @param {Array<{ key: string, label: string }>} columns - Column definitions for the table header.
 * @param {(item: any, index: number) => React.ReactNode} renderDesktopRow - Function to render a desktop table row.
 * @param {(item: any, index: number) => React.ReactNode} renderMobileRow - Function to render a mobile list item.
 * @param {string} emptyMessage - Message shown when data is empty.
 *
 * @returns {JSX.Element} Responsive table component.
 */
export default function Table({
  data,
  columns,
  emptyMessage,
  renderMobileRow,
  renderDesktopRow,
}) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  className={`text-grey-500 px-6 py-4 text-xs whitespace-nowrap ${i === columns.length - 1 ? "text-end" : "text-left"}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.length ? (
              data.map(renderDesktopRow)
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-grey-500 bg-beige-100 rounded-md py-10 text-center font-semibold">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile staked/list view */}
      <div className="divide-grey-100 divide-y md:hidden">
        {data?.length ? (
          data.map(renderMobileRow)
        ) : (
          <span className="text-grey-500 bg-beige-100 inline-block w-full rounded-md px-6 py-8 text-center font-semibold">
            {emptyMessage}
          </span>
        )}
      </div>
    </>
  );
}
