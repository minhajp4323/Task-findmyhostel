import { useState, useEffect } from 'react';
import axios from 'axios';

const TanentBill = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:4444/api/user/mybills', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBills(response.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching bills');
      }
    };

    fetchBills();
  }, []);

  const updateBillStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:4444/api/user/mybills/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBills(prevBills => prevBills.map(bill => 
        bill._id === id ? { ...bill, status } : bill
      ));
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error updating bill status');
    }
  };

  const handleStatusChange = (id, event) => {
    const newStatus = event.target.value;
    updateBillStatus(id, newStatus);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Bills</h2>
      {bills.length === 0 ? (
        <div>No bills found</div>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Bill Type</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id}>
                <td className="py-2 px-4 border-b">{bill.billType}</td>
                <td className="py-2 px-4 border-b">{bill.amount}</td>
                <td className="py-2 px-4 border-b">{new Date(bill.dueDate).toLocaleDateString()}</td>
                <td
                  className={`py-2 px-4 border-b ${
                    bill.status === 'paid' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  <select
                    value={bill.status}
                    onChange={(e) => handleStatusChange(bill._id, e)}
                    className="border border-gray-300 rounded p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TanentBill;
