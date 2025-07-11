"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { useState } from "react";

export default function ComparisonBarChart({ results }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!results) return null;

  const { label = "Sale", withV = 0, withoutV = 0 } = results;

  const COLORS = {
    "With V": "#801DEB",
    "Without V": "#D0A4FF",
  };

  const data = [
    { name: "With V", value: withV },
    { name: "Without V", value: withoutV },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const name = payload[0].payload?.name;
    const value = payload[0].value;

    return (
      <div className="bg-white p-2 border shadow rounded text-sm">
        <div className="flex items-center gap-2 mb-1">
          <div
            style={{ backgroundColor: COLORS[name] }}
            className="w-3 h-3 rounded-full"
          />
          <span className="font-semibold text-gray-800">{name}</span>
        </div>
        <div className="font-black text-gray-900">
          ${Math.round(value).toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[350px] mt-4">
      <h2 className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-center mb-4 whitespace-nowrap">
        {label} Proceeds: With V vs Without V
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={80}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickLine={false} dy={6} />
          <YAxis
            tickFormatter={(val) => {
              if (val === 0) return "$0";
              if (val >= 1_000_000)
                return `$${(val / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
              if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}k`;
              return `$${val}`;
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
            isAnimationActive={false}
            wrapperStyle={{
              display: activeIndex !== null ? "block" : "none",
              pointerEvents: "none",
            }}
          />
          <Bar
            dataKey="value"
            activeBar={{ fillOpacity: 1 }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name]}
                fillOpacity={
                  activeIndex === null || activeIndex === index ? 1 : 0.7
                }
                onMouseEnter={() => setActiveIndex(index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
