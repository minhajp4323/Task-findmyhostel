import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4444/api/user/login",
        formData
      );

      if (response.status === 200) {
        const { role, token } = response.data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        toast.success("Login successful!");

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "tenant") {
          navigate("/tenant");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found!");
      } else if (error.response && error.response.status === 400) {
        toast.error("Invalid credentials!");
      } else {
        toast.error("Failed to login. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-md lg:max-w-2xl w-full">
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                required
                placeholder="Type your name..."
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                required
                placeholder="Type your password..."
                onChange={handleChange}
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <a href="#" onClick={() => navigate('/register')} className="text-blue-500 hover:underline">
              Don`t have an account? Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
