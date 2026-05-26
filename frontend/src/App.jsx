import { useState } from "react";
import API from "./api/api";

export default function MedicalRAGUI() {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [reportId, setReportId] = useState(null);
  const [name, setName] = useState("");

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  
  
  const user = JSON.parse(localStorage.getItem("user"));
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {

    try {
      const response = await API.post("http://127.0.0.1:8000/auth/login", {
        email,
        password
      });
      
     
      localStorage.setItem("user", JSON.stringify(response.data.user));
  
      localStorage.setItem(
        "token",
        response.data.access_token
      );
  
      alert("Login successful!");
  
      setShowLogin(false);
  
    } catch (error) {
  
      console.error(error);
  
      alert("Login failed");
  
    }
    
  };
  const handleRegister = async () => {

    try {
  
      await API.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );
  
      alert("Registration successful!");
  
      setShowRegister(false);
  
    } catch (error) {
  
      console.error(error.response.data, "Registration error");
  
      alert("Registration failed");
  
    }
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await API.post(
        "/reports/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setReportId(response.data.report_id);
      alert("Upload successful!");

    } catch (error) {

      console.error(error);
      alert("Upload failed");

    } finally {

      setUploading(false);

    }
  };
  const handleAsk = async () => {

    if (!question.trim()) return;
  
    try {
  
      const token = localStorage.getItem("token");
  
      const userMessage = {
        role: "user",
        text: question
      };
  
      setMessages((prev) => [...prev, userMessage]);
  
      const response = await API.post(
        "/chat/ask",
        {
          question: question,
          report_id: reportId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      const aiMessage = {
        role: "assistant",
        text: response.data.answer
      };
  
      setMessages((prev) => [...prev, aiMessage]);
  
      setQuestion("");
  
    } catch (error) {
  
      console.error(error.response.data, "Question error");
  
      alert("Question failed");
  
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* Navbar */}
      
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold">
              Medical RAG System
            </h1>
            <div className="top-right-user font-semibold">
            <p className="font-semibold">
            Welcome, {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}</p>
      <p className="text-sm text-slate-500">
    Logged In
  </p>
    </div>


            <p className="text-sm text-slate-500">
              AI-powered Medical Report Assistant
            </p>
          </div>

        <div className="flex items-center gap-3">

            <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-2 rounded-xl border hover:bg-slate-100 transition">
                Login
            </button>

            <button
                onClick={() => setShowRegister(true)}
                className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 transition">
                Register
            </button>

        </div>

        </div>
      </nav>
      {/* Login Modal */}
{
  showLogin && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-3xl w-[400px] shadow-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Login
        </h2>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

<button
  onClick={handleLogin}
  className="w-full bg-black text-white py-3 rounded-xl"
>
  Login
</button>

          <button
            onClick={() => setShowLogin(false)}
            className="w-full border py-3 rounded-xl"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  )
}

{/* Register Modal */}
{
  showRegister && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-3xl w-[400px] shadow-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Register
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Register
          </button>

          <button
            onClick={() => setShowRegister(false)}
            className="w-full border py-3 rounded-xl"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  )
}
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left Side */}
          <div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Upload Medical Reports
              <br />
              & Ask Questions Using AI
            </h2>

            <p className="text-lg text-slate-600 mb-8">
              Extract insights from blood reports, ECGs,
              prescriptions, and other medical documents instantly.
            </p>

            <div className="flex gap-4">

              <button className="px-6 py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition">
                Upload Report
              </button>

              <button className="px-6 py-3 rounded-2xl border font-medium hover:bg-slate-100 transition">
                View Demo
              </button>

            </div>

          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border">

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:border-black transition">

              <div className="text-5xl mb-4">
                📄
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Upload Your Report
              </h3>

              <p className="text-slate-500 mb-6">
                Drag & drop PDF or image files here
              </p>

              <div className="flex flex-col items-center gap-4">

                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="border rounded-lg p-2"
                />

                <button
                  onClick={handleUpload}
                  className="px-5 py-2 rounded-xl bg-black text-white hover:opacity-90 transition"
                >
                  {uploading ? "Uploading..." : "Upload File"}
                </button>

              </div>

            </div>

            {/* Uploaded File Preview */}
            {
              file && (
                <div className="mt-6 bg-slate-100 rounded-2xl p-4">

                  <div className="flex items-center justify-between mb-2">

                    <span className="font-medium">
                      {file.name}
                    </span>

                    <span className="text-green-600 text-sm">
                      Selected
                    </span>

                  </div>

                  <div className="w-full bg-slate-300 rounded-full h-2">

                    <div className="bg-black h-2 rounded-full w-full"></div>

                  </div>

                </div>
              )
            }

          </div>

        </div>

      </section>

      {/* Dashboard */}
      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Reports */}
          <div className="lg:col-span-1 bg-white rounded-3xl shadow-md p-6 border h-fit">

            <div className="flex items-center justify-between mb-6">

              <h3 className="text-xl font-bold">
                Uploaded Reports
              </h3>

              <button className="text-sm px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200">
                + Add
              </button>

            </div>

            <div className="space-y-4">

              <div className="p-4 rounded-2xl border hover:shadow-md transition cursor-pointer">

                <div className="flex items-center justify-between mb-2">

                  <h4 className="font-semibold">
                    Blood Test
                  </h4>

                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Ready
                  </span>

                </div>

                <p className="text-sm text-slate-500">
                  Uploaded 2 hours ago
                </p>

              </div>

              <div className="p-4 rounded-2xl border hover:shadow-md transition cursor-pointer">

                <div className="flex items-center justify-between mb-2">

                  <h4 className="font-semibold">
                    ECG Report
                  </h4>

                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    Processing
                  </span>

                </div>

                <p className="text-sm text-slate-500">
                  Uploaded yesterday
                </p>

              </div>

            </div>

          </div>

          {/* Chat Section */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border flex flex-col h-[700px]">

            <div className="p-6 border-b flex items-center justify-between">

              <div>

                <h3 className="text-2xl font-bold">
                  AI Medical Assistant
                </h3>

                <p className="text-slate-500 text-sm">
                  Ask questions about uploaded reports
                </p>

              </div>

              <div className="px-4 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-medium">
                Online
              </div>

            </div>

            {/* Chat Messages */}
            {
  messages.map((msg, index) => (

    <div
      key={index}
      className={`flex ${
        msg.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-xl px-5 py-4 shadow ${
          msg.role === "user"
            ? "bg-black text-white rounded-3xl rounded-br-md"
            : "bg-white border rounded-3xl rounded-bl-md"
        }`}
      >

        {
          msg.role === "assistant" && (
            <p className="font-medium mb-2">
              AI Assistant
            </p>
          )
        }

        <p>
          {msg.text}
        </p>

      </div>

    </div>

  ))
}

            {/* Input */}
            <div className="p-4 border-t bg-white">

              <div className="flex gap-3">

              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask something about the report..."
                className="flex-1 px-5 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-black"
              />

                <button 
                    onClick={handleAsk}
                className="px-6 py-4 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition">
                  Send
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}