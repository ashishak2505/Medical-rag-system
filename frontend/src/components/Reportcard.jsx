import {
  FileText,
  MessageSquare,
  Trash2
} from "lucide-react";

export default function ReportCard({
  report,
  setReportId,
  fetchChatHistory,
  deleteReport
}) {

  const handleOpen = () => {
    setReportId(report.report_id);
    fetchChatHistory(report.report_id);
  };

  return (
    <div
      onClick={handleOpen}
      className="
        bg-white
        border
        rounded-2xl
        p-5
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start">

        <div className="flex gap-3">

          <div className="bg-blue-100 p-3 rounded-xl">
            <FileText size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {report.filename}
            </h3>

            <p className="text-sm text-slate-500">
              Uploaded Report
            </p>
          </div>

        </div>

        <span
          className="
            bg-green-100
            text-green-700
            text-xs
            font-medium
            px-3
            py-1
            rounded-full
          "
        >
          Analyzed
        </span>

      </div>

      {/* Divider */}
      <div className="border-t my-4"></div>

      {/* Footer */}
      <div className="flex justify-between items-center">

        <div>
          <p className="text-xs text-slate-500">
            Uploaded On
          </p>

          <p className="text-sm font-medium">
            {new Date(report.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-2">

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            className="
              flex items-center gap-1
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-3 py-2
              rounded-lg
              text-sm
            "
          >
            <MessageSquare size={16} />
            Chat
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteReport(report.report_id);
            }}
            className="
              flex items-center gap-1
              bg-red-500
              hover:bg-red-600
              text-white
              px-3 py-2
              rounded-lg
              text-sm
            "
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}