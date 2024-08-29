import { useNavigate } from "react-router-dom";

function TanentHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <button
        className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded m-2"
        onClick={() => navigate("/bills")}
      >
        My Bills
      </button>
      <button
        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded m-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default TanentHome;
