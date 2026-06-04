export default function Navbar({
    user,
    setShowLogin,
    setShowRegister
  }) {
  
    return (
  
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
  
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
  
          <div>
  
            <h1 className="text-2xl font-bold">
              Medical RAG System
            </h1>
  
            <p className="text-sm text-slate-500">
              AI-powered Medical Report Assistant
            </p>
  
          </div>
  
          {!user ? (
  
            <div className="flex gap-3">
  
              <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-2 rounded-xl border"
              >
                Login
              </button>
  
              <button
                onClick={() => setShowRegister(true)}
                className="px-4 py-2 rounded-xl bg-black text-white"
              >
                Register
              </button>
  
            </div>
  
          ) : (
  
            <div className="flex items-center gap-3">
  
              <p className="font-semibold">
                {user.name}
              </p>
  
              <button
                onClick={() => {
  
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
  
                  window.location.reload();
  
                }}
                className="px-4 py-2 rounded-xl bg-red-500 text-white"
              >
                Logout
              </button>
  
            </div>
  
          )}
  
        </div>
  
      </nav>
  
    );
  }