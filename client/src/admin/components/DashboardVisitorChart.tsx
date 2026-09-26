import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface VisitorPoint {
  day: string;
  visitors: number;
}

const DashboardVisitorChart = ({ data }: { data: VisitorPoint[] }) => (
  <section className="mt-8 rounded-md border border-white/20 bg-green-900/20 p-6">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white">
        Visitor trend (last 7 days)
      </h2>
      <span className="text-xs text-gray-300">Unique daily visitors</span>
    </div>
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f4934" />
          <XAxis dataKey="day" stroke="#b8c7bd" fontSize={12} />
          <YAxis stroke="#b8c7bd" allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "#062e20",
              border: "1px solid #1c6b4a",
              borderRadius: "8px",
              color: "#d1fae5",
            }}
          />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{ r: 4, fill: "#22d3ee" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default DashboardVisitorChart;
