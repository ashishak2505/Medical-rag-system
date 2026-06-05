import ReactMarkdown from "react-markdown";
export default function ChatBox({
    messages,
    question,
    setQuestion,
    handleAsk
  }) {
  
    return (
  
      <div className="bg-white rounded-3xl shadow-md border flex flex-col h-[700px]">
  
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
  
          {messages.map((msg, index) => (
  
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
                    ? "bg-black text-white rounded-3xl"
                    : "bg-white border rounded-3xl"
                }`}
              >
  
            <ReactMarkdown>{msg.text}</ReactMarkdown>

  
              </div>
  
            </div>
  
          ))}
  
        </div>
  
        <div className="p-4 border-t flex gap-3">
  
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 px-5 py-4 rounded-2xl border"
          />
  
          <button
            onClick={handleAsk}
            className="px-6 py-4 rounded-2xl bg-black text-white"
          >
            Send
          </button>
  
        </div>
  
      </div>
  
    );
  }