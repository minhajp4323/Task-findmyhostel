import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "tenant",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4444/api/user/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("User created successfully!");
        if (formData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } 
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists!");
      } else {
        toast.error("Failed to create user. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-md lg:max-w-2xl w-full">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://hips.hearstapps.com/hmg-prod/images/sitting-rooms-hilliard-locust-18-11-20-1578948041.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                required
                placeholder="Type your email..."
                onChange={handleChange}
              />
            </div>
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
                Role
              </label>
              <select
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="tenant">Tenant</option>
                <option value="admin">Admin</option>
              </select>
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
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <a href="#" onClick={() => navigate('/login')} className="text-blue-500 hover:underline">
              Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
