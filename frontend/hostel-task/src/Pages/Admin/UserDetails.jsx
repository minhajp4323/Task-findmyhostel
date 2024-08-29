import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4444/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.data);
        setRole(response.data.data.role);
        setStatus(response.data.data.status);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    try {
      await axios.patch(
        `http://localhost:4444/api/user/${id}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRole(newRole);
      setUser(prevUser => ({ ...prevUser, role: newRole }));
    } catch (error) {
      console.error("Failed to update role:", error.response ? error.response.data : error.message);
      setError("Failed to update role.");
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await axios.patch(
        `http://localhost:4444/api/user/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStatus(newStatus);
      setUser(prevUser => ({ ...prevUser, status: newStatus }));
    } catch (error) {
      console.error("Failed to update status:", error.response ? error.response.data : error.message);
      setError("Failed to update status.");
    }
  };

  const statusColor = status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800";

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : user ? (
        <div>
          <h1 className="text-3xl font-semibold mb-4">{user.name}</h1>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-medium text-gray-700 mb-2">Email:</p>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <p className="text-lg font-medium text-gray-700 mb-2">Role:</p>
            <select
              value={role}
              onChange={handleRoleChange}
              className="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="tenant">Tenant</option>
            </select>
            <p className="text-lg font-medium text-gray-700 mb-2 mt-4">Status:</p>
            <select
              value={status || "active"}
              onChange={handleStatusChange}
              className="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="vecated">Vecated</option>
            </select>
            <p className={`p-2 rounded-lg ${statusColor} mt-4`}>{status || "Active"}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">User not found</p>
      )}
    </div>
  );
};

export default UserDetails;
