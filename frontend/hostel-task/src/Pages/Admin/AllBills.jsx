import { useEffect, useState } from "react";
import axios from "axios";

function AllBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4444/api/user/bills",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBills(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.patch(
        `http://localhost:4444/api/user/bills/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update the local state with the new data
      setBills(
        bills.map((bill) =>
          bill._id === id ? { ...bill, ...updatedData } : bill
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    handleUpdate(id, { status: newStatus });
  };

  const handleBillTypeChange = (id, newBillType) => {
    handleUpdate(id, { billType: newBillType });
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Bills</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="py-3 px-4 text-left text-gray-600">User Name</th>
              <th className="py-3 px-4 text-left text-gray-600">Bill ID</th>
              <th className="py-3 px-4 text-left text-gray-600">Amount</th>
              <th className="py-3 px-4 text-left text-gray-600">Due Date</th>
              <th className="py-3 px-4 text-left text-gray-600">Status</th>
              <th className="py-3 px-4 text-left text-gray-600">Bill Type</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id} className="border-b">
                <td className="py-2 px-4">{bill.userId ? bill.userId.name : "No Name"}</td>
                <td className="py-2 px-4">{bill._id}</td>
                <td className="py-2 px-4">${bill.amount.toFixed(2)}</td>
                <td className="py-2 px-4">{new Date(bill.dueDate).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  <select
                    value={bill.status}
                    onChange={(e) => handleStatusChange(bill._id, e.target.value)}
                    className="border border-gray-300 rounded p-1 bg-gray-50"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <select
                    value={bill.billType}
                    onChange={(e) => handleBillTypeChange(bill._id, e.target.value)}
                    className="border border-gray-300 rounded p-1 bg-gray-50"
                  >
                    <option value="security">Security</option>
                    <option value="other">Other</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllBills;
