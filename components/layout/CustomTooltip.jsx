/**
 * CustomTooltip component for Recharts PieChart.
 *
 * Displays detailed information about the hovered pie slice.
 * It replaces the default Recharts tooltip with a styled, theme-consistent card.
 *
 * Props provided automatically by Recharts:
 * @param {boolean} active - Whether the tooltip is currently active (hovering a slice).
 * @param {Array} payload - Data for the active slice (contains `payload[0].payload`).
 *
 * Expected data shape inside `payload[0].payload`:
 * ```js
 * {
 *   name: string,        // Category name
 *   color: string,       // Slice color
 *   spent: number,       // Amount spent in this category
 *   maxLimit: number,    // Max limit for this category
 *   totalLimit: number,  // Total limit across all categories (added in chartData)
 * }
 * ```
 *
 * Example usage in `<Tooltip />`:
 * ```jsx
 * <Tooltip content={<CustomTooltip />} />
 * ```
 *
 * @see https://recharts.github.io/en-US/examples/CustomContentOfTooltip/
 */

export default function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { category, maximum, spent, theme, totalLimit } = payload[0].payload;
  const percentage = ((maximum / totalLimit) * 100).toFixed(1);

  return (
    <div className="border-border bg-card/90 rounded-xl border px-3 py-2 text-sm shadow-md backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span
          className="inline-block size-2 rounded-full"
          style={{ backgroundColor: theme }}
        />
        <span className="font-bold">{category}</span>
      </div>

      <div className="text-muted-foreground mt-1 space-y-0.5 text-xs">
        <span className="block font-semibold">
          <b>Spent:</b> ${spent}
        </span>
        <span className="block font-semibold">
          <b>Limit:</b> ${maximum}
        </span>
        <span className="block font-semibold">
          <b>Share:</b> {percentage}%
        </span>
      </div>
    </div>
  );
}
