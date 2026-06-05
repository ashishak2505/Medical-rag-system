import ReportCard from "./Reportcard";

export default function Sidebar({
  reports,
  setReportId,
  fetchChatHistory,
  deleteReport
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border p-6 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-slate-800">
          Reports
        </h3>

        <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
          {reports.length}
        </span>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search reports..."
        className="
          w-full
          mb-5
          px-4
          py-3
          border
          rounded-xl
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      {/* Report List */}
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {reports.map((report) => (
          <ReportCard
            key={report.report_id}
            report={report}
            setReportId={setReportId}
            fetchChatHistory={fetchChatHistory}
            deleteReport={deleteReport}
          />
        ))}
      </div>

    </div>
  );
}