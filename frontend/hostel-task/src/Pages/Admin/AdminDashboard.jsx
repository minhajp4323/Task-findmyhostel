import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h2>
        <div className="space-y-4">
          <button
            className="w-full bg-indigo-900 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-800 transition duration-300"
            onClick={() => navigate("/allUsers")}
          >
            View All Users
          </button>
          <button
            className="w-full bg-slate-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-300 transition duration-300"
            onClick={() => navigate("/allBills")}
          >
            View All Bills
          </button>
          <button
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-400 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
