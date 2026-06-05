export default function UploadBox({
  file,
  setFile,
  handleUpload,
  uploading
}) {
  return (
    <div className="bg-white rounded-3xl shadow-md border p-6 mb-6">

      <h2 className="text-xl font-bold mb-4">
        Upload Report
      </h2>

      <div className="flex items-center gap-3">

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="
            flex-1
            border
            rounded-xl
            p-3
            text-sm
          "
        />

        <button
          onClick={handleUpload}
          className="
            px-6
            py-3
            rounded-xl
            bg-black
            text-white
            hover:bg-slate-800
            transition
          "
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

      </div>

      {file && (
        <p className="mt-3 text-sm text-slate-500">
          Selected: {file.name}
        </p>
      )}

    </div>
  );
}