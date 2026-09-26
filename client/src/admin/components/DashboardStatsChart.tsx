import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartPoint {
  metric: string;
  value: number;
}

const DashboardStatsChart = ({ data }: { data: ChartPoint[] }) => (
  <section className="mt-8 rounded-md border border-white/20 bg-green-900/20 p-6">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white">
        Dashboard stats analytics
      </h2>
      <span className="text-xs text-gray-300">Metrics from all stat cards</span>
    </div>
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f4934" />
          <XAxis dataKey="metric" stroke="#b8c7bd" fontSize={12} />
          <YAxis stroke="#b8c7bd" allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(34, 197, 94, 0.1)" }}
            contentStyle={{
              background: "#062e20",
              border: "1px solid #1c6b4a",
              borderRadius: "8px",
              color: "#d1fae5",
            }}
          />
          <Bar dataKey="value" fill="#02a94c" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default DashboardStatsChart;
