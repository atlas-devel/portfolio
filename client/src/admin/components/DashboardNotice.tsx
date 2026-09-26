interface DashboardNoticeProps {
  title: string;
  detail: string;
  time: string;
}

const DashboardNotice = ({ title, detail, time }: DashboardNoticeProps) => (
  <div className="fixed right-4 top-4 z-[80] w-[92vw] max-w-md rounded-md border border-green-500/30 bg-[#0d1f18] p-4 text-white shadow-lg">
    <h2 className="text-base font-semibold text-green-400">{title}</h2>
    <p className="mt-1 text-sm text-gray-200">{detail}</p>
    <p className="mt-2 text-xs text-green-200/80">Saved at {time}</p>
  </div>
);

export default DashboardNotice;
