// import axios from "axios";
// import "./Css/StudentDetail.css";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { format } from "date-fns";

// const StudentDetail = () => {
//   const [student, setStudent] = useState({});
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [error, setError] = useState("");
//   const params = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState({});

//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       try {
//         const studentResponse = await axios.get(
//           `http://localhost:4200/student/student-detail/${params.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setStudent(studentResponse.data.StudentDetail);
//         setCourse(studentResponse.data.courseDetail);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch student details.");
//       }
//     };

//     const fetchPaymentHistory = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:4200/fee/payment-history/${params.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setPaymentHistory(response.data.paymentHistory);
//       } catch (err) {
//         setError(
//           err.response?.data?.error || "Failed to fetch payment history."
//         );
//         console.error(err);
//       }
//     };

//     fetchStudentDetails();
//     fetchPaymentHistory();
//   }, [params.id]);

//   const formatDate = (dateString) => {
//     return format(new Date(dateString), "dd MMM yyyy HH:mm:ss");
//   };

//   const deleteStudent = async (studentId) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       try {
//         await axios.delete(`http://localhost:4200/student/${studentId}`, {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         });

//         toast.success("Student deleted successfully!");
//         navigate("/dashboard/course-detail/" + course._id);
//       } catch (err) {
//         console.error("Error:", err);
//         toast.error("Failed to delete the student. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="student-detail-main-wrapper">
//       <div className="student-detail-wrapper">
//         <h1>Student Full Details</h1>
//         <div className="student-detail-header">
//           <button
//             onClick={() =>
//               navigate(`/dashboard/update-student/${student._id}`, {
//                 state: { student },
//               })
//             }
//             className="p-btn"
//           >
//             Edit
//           </button>
//           <button className="s-btn" onClick={() => deleteStudent(student._id)}>
//             Delete
//           </button>
//         </div>
//       </div>

//       <div className="sd-detail">
//         {student.imageUrl ? (
//           <img src={student.imageUrl} alt="Student" />
//         ) : (
//           <div className="placeholder-image">No Image</div>
//         )}
//         <div>
//           <h2>{student.fullName}</h2>
//           <p>Phone: {student.phone}</p>
//           <p>Email: {student.email}</p>
//           <p>Address: {student.address}</p>
//           <h4>Course Name:- {course.courseName}</h4>
//         </div>
//       </div>

//       <div className="payment-history-container">
//         <h2>Payment History</h2>
//         {error && <p className="error">{error}</p>}
//         {paymentHistory.length === 0 ? (
//           <p>No payment history available.</p>
//         ) : (
//           <table className="payment-history-table">
//             <thead>
//               <tr>
//                 <th>Payment ID</th>
//                 <th>Amount</th>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paymentHistory.map((payment) => (
//                 <tr key={payment._id}>
//                   <td>{payment._id}</td>
//                   <td>{payment.amount}</td>
//                   <td>{formatDate(payment.createdAt)}</td>
//                   <td>{payment.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDetail;

import axios from "axios";
import "./Css/StudentDetail.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";

const StudentDetail = () => {
  const [student, setStudent] = useState({});
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});

  useEffect(() => {
    fetchStudentDetails();
  }, [params.id]);

  useEffect(() => {
    if (student.phone && course._id) {
      fetchPaymentHistory();
    }
  }, [student.phone, course._id]);

  const fetchStudentDetails = async () => {
    try {
      const studentResponse = await axios.get(
        `http://localhost:4200/student/student-detail/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (studentResponse.data) {
        setStudent(studentResponse.data.StudentDetail);
        setCourse(studentResponse.data.courseDetail);
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (err) {
      console.error("Error fetching student details:", err);
      toast.error("Failed to fetch student details.");
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4200/fee/all-payment?objectId=${course._id}&phone=${student.phone}`,
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
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:4200/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        toast.success("Student deleted successfully!");
        navigate("/dashboard/course-detail/" + course._id);
      } catch (err) {
        console.error("Error deleting student:", err);
        toast.error("Failed to delete the student. Please try again.");
      }
    }
  };

  return (
    <div className="student-detail-main-wrapper">
      <div className="student-detail-wrapper">
        <h1>Student Full Details</h1>
        <div className="student-detail-header">
          <button
            onClick={() =>
              navigate(`/dashboard/update-student/${student._id}`, {
                state: { student },
              })
            }
            className="p-btn"
          >
            Edit
          </button>
          <button className="s-btn" onClick={() => deleteStudent(student._id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="sd-detail">
        {student.imageUrl ? (
          <img src={student.imageUrl} alt="Student" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
        <div>
          <h2>{student.fullName}</h2>
          <p>Phone: {student.phone}</p>
          <p>Email: {student.email}</p>
          <p>Address: {student.address}</p>
          <h4>Course Name: {course.courseName}</h4>
        </div>
      </div>

      <div className="payment-history-container">
        <h2>Payment History</h2>
        {loading ? (
          <p>Loading payment history...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : paymentHistory.length === 0 ? (
          <p>No payment history available.</p>
        ) : (
          <table className="payment-history-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment._id}</td>
                  <td>{payment.amount}</td>
                  <td>
                    {format(
                      new Date(payment.createdAt),
                      "dd MMM yyyy | hh:mm a"
                    )}
                  </td>
                  <td>{payment.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
