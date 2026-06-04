export default function UploadBox({
    file,
    setFile,
    handleUpload,
    uploading
  }) {
  
    return (
  
      <div className="bg-white rounded-3xl shadow-xl p-6 border">
  
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center">
  
          <div className="text-5xl mb-4">
            📄
          </div>
  
          <h3 className="text-xl font-semibold mb-2">
            Upload Your Report
          </h3>
  
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded-lg p-2 mb-4"
          />
  
          <button
            onClick={handleUpload}
            className="px-5 py-2 rounded-xl bg-black text-white"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
  
        </div>
  
      </div>
  
    );
  }