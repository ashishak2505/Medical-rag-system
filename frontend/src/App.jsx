import { useState, useEffect } from "react";
import API from "./api/api";

import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

function App() {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [reportId, setReportId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [reports, setReports] = useState([]);

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // ---------------- LOGIN ----------------

  const handleLogin = async () => {

    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setUser(response.data.user);

      setShowLogin(false);

    } catch (error) {

      console.error(error);

    }

  };

  // ---------------- REGISTER ----------------

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

      setShowRegister(false);

    } catch (error) {

      console.error(error);

    }

  };

  // ---------------- FETCH REPORTS ----------------

  const fetchReports = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/reports/my-reports",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setReports(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchReports();

  }, []);

  // ---------------- DELETE REPORT ----------------

  const deleteReport = async (reportId) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(
        `/reports/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setReports(
        reports.filter(
          (report) =>
            report.report_id !== reportId
        )
      );

    } catch (error) {

      console.error(error);

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
            "Content-Type": "multipart/form-data"
          }
        }
      );
  
      setReportId(response.data.report_id);
  
      fetchReports();
  
      alert("Upload successful!");
  
    } catch (error) {
  
      console.error(error);
  
      alert("Upload failed");
  
    } finally {
  
      setUploading(false);
  
    }
  
  };
  const fetchChatHistory = async (id) => {

    try {
  
      const token = localStorage.getItem("token");
  
      const response = await API.get(
        `/chat/history/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      const formattedMessages =
        response.data.flatMap((chat) => [
          {
            role: "user",
            text: chat.question
          },
          {
            role: "assistant",
            text: chat.answer
          }
        ]);
  
      setMessages(formattedMessages);
  
    } catch (error) {
  
      console.error(error);
  
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
  
      setMessages((prev) => [
        ...prev,
        userMessage
      ]);
  
      const response = await API.post(
        "/chat/ask",
        {
          question,
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
  
      setMessages((prev) => [
        ...prev,
        aiMessage
      ]);
  
      setQuestion("");
  
    } catch (error) {
  
      console.error(error);
  
    }
  
  };

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar
        user={user}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
      />

      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />

      <RegisterModal
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleRegister={handleRegister}
      />

      <div className="max-w-7xl mx-auto p-6">

        <UploadBox
          
          file={file}
          setFile={setFile}
          uploading={uploading}
          handleUpload={handleUpload}
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-6">

        <Sidebar
            reports={reports}
            setReportId={setReportId}
            fetchChatHistory={fetchChatHistory}
            deleteReport={deleteReport}
        />
          <div className="lg:col-span-2">

        <ChatBox
            messages={messages}
            question={question}
            setQuestion={setQuestion}
            handleAsk={handleAsk}
        />
          </div>

        </div>

      </div>

    </div>

  );

}

export default App;