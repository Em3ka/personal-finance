"use client";

import { useState } from "react";
import CustomTooltip from "./CustomTooltip";
import ChartCenterLabel from "@/components/layout/ChartCenterLabel";
import { Pie, Cell, PieChart, Tooltip, Customized, ResponsiveContainer } from "recharts";

export default function Chart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const totalSpent = data.reduce((acc, cur) => acc + cur.spent, 0);
  const totalLimit = data.reduce((acc, cur) => acc + cur.maximum, 0);
  const chartData = data.map((d) => ({ ...d, totalLimit }));

  const handleMouseEnter = (_, index) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        {/* --- solid background ring --- */}
        <Pie
          data={chartData}
          dataKey="maximum"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="90%"
          startAngle={450}
          endAngle={90}
          stroke="none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          {data.map((entry, i) => (
            <Cell
              key={`fg-${i}`}
              fill={entry.theme}
              fillOpacity={activeIndex === i ? 1 : 0.8}
            />
          ))}
        </Pie>

        {/* --- lighter background ring --- */}
        <Pie
          data={chartData}
          dataKey="maximum"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          startAngle={450}
          endAngle={90}
          stroke="none"
          tooltipType="none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          {data.map((entry, i) => (
            <Cell
              key={`bg-${i}`}
              fill={entry.theme}
              fillOpacity={activeIndex === i ? 1 : 0.55}
            />
          ))}
        </Pie>

        <Customized
          component={<ChartCenterLabel totalSpent={totalSpent} totalLimit={totalLimit} />}
        />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
