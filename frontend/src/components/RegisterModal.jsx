export default function RegisterModal({
    showRegister,
    setShowRegister,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleRegister
  }) {
  
    if (!showRegister) return null;
  
    return (
  
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
              className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
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
  
    );
  }