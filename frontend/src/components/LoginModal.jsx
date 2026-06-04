export default function LoginModal({
    showLogin,
    setShowLogin,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin
  }) {
  
    if (!showLogin) return null;
  
    return (
  
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
              className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
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
  
    );
  }