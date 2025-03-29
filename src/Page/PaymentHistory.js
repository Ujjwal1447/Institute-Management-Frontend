// import React, { useEffect, useState } from "react";
// import "./Css/PaymentHistory.css";
// import axios from "axios";
// import { toast } from "react-toastify";

// const PaymentHistory = () => {
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getPaymentHistoryData();
//   }, []);

//   const getPaymentHistoryData = () => {
//     axios
//       .get("http://localhost:4200/fee/payment-history", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => {
//         // console.log(res.data);
//         setPaymentHistory(res.data.paymentHistory);
//       })
//       .catch((err) => {
//         console.error("Error fetching payment history:", err);
//         toast.error("Something went wrong. Please try again.");
//         setError("Error fetching payment history.");
//       });
//   };

//   return (
//     <div className="payment-history-container">
//       <h1>Payment History</h1>
//       {error ? (
//         <p className="error">{error}</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Amount</th>
//               <th>Date</th>
//               <th>remark</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paymentHistory.map((payment) => (
//               <tr key={payment._id}>
//                 <td>{payment._id}</td>
//                 <td>{payment.amount}</td>
//                 <td>{payment.createdAt}</td>
//                 <td>{payment.remark}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// // export default PaymentHistory;

// import React, { useEffect, useState } from "react";
// import "./Css/PaymentHistory.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { format } from "date-fns";

// const PaymentHistory = ({ studentId }) => {
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (studentId) {
//       getPaymentHistoryData();
//     }
//   }, [studentId]);

//   const getPaymentHistoryData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4200/fee/payment-history/${studentId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (response.data?.paymentHistory) {
//         setPaymentHistory(response.data.paymentHistory);
//       } else {
//         throw new Error("Invalid response format.");
//       }
//     } catch (err) {
//       console.error("Error fetching payment history:", err);
//       toast.error(
//         err.response?.data?.error || "Failed to fetch payment history."
//       );
//       setError("Error fetching payment history.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="payment-history-container">
//       <h1>Payment History</h1>
//       {loading ? (
//         <p>Loading payment history...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : paymentHistory.length === 0 ? (
//         <p>No payment history available.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Amount</th>
//               <th>Date</th>
//               <th>Remark</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paymentHistory.map((payment) => (
//               <tr key={payment._id}>
//                 <td>{payment._id}</td>
//                 <td>{payment.amount}</td>
//                 <td>
//                   {format(new Date(payment.createdAt), "dd MMM yyyy | hh:mm a")}
//                 </td>
//                 <td>{payment.remark}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default PaymentHistory;

import React, { useEffect, useState } from "react";
import "./Css/PaymentHistory.css";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPaymentHistoryData();
  }, []);

  const getPaymentHistoryData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `http://localhost:4200/fee/payment-history`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data?.paymentHistory) {
        setPaymentHistory(response.data.paymentHistory);
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (err) {
      console.error("Error fetching payment history:", err);
      setError(err.response?.data?.error || "Failed to fetch payment history.");
      toast.error(
        err.response?.data?.error || "Failed to fetch payment history."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-history-container">
      <h1>Payment History</h1>

      {loading ? (
        <p>Loading payment history...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : paymentHistory.length === 0 ? (
        <p>No payment history available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment._id}>
                <td>{payment._id}</td>
                <td>{payment.amount}</td>
                <td>
                  {format(new Date(payment.createdAt), "dd MMM yyyy | hh:mm a")}
                </td>
                <td>{payment.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
