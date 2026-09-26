import DashboardStatsChart from "./DashboardStatsChart";
import DashboardVisitorChart from "./DashboardVisitorChart";

interface ChartPoint { metric: string; value: number }
interface VisitorPoint { day: string; visitors: number }
interface DashboardChartsProps { statsChartData: ChartPoint[]; visitorTrendData: VisitorPoint[] }

const DashboardCharts = ({ statsChartData, visitorTrendData }: DashboardChartsProps) => (
  <>
    <DashboardStatsChart data={statsChartData} />
    <DashboardVisitorChart data={visitorTrendData} />
  </>
);

export default DashboardCharts;
