export default function ChartCenterLabel({ totalSpent, totalLimit }) {
  return (
    <>
      <text x="50%" y="50%" textAnchor="middle" fontWeight="bold" fontSize={32}>
        ${totalSpent}
      </text>

      <text x="50%" y="58%" textAnchor="middle" fill="#696868" fontSize={12}>
        of ${totalLimit} limit
      </text>
    </>
  );
}
