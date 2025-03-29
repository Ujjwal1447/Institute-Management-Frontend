import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Css/CollectFee.css";
import { useLocation, useNavigate } from "react-router-dom";

const CollectFee = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState(location.state?.courseId || ""); // Pre-select course if provided in state
  const [courseList, setCourseList] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    course:"",
    amount: "",
    remark: "",
  });

  // Fetch the list of courses when the component is mounted
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4200/course/all-courses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCourseList(response.data.courses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        toast.error("Unable to load courses. Please try again later.");
      }
    };

    fetchCourses();
  }, []);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("token");
      
      const response = await axios.post(
        "http://localhost:4200/fee/add-fee",
        { ...formData, courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      navigate("/dashboard/payment-history"); // Redirect to payment history or another appropriate page
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error || "Failed to add payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="add-fee-wrapper">
      <h1>Add New Payment</h1>
      <form onSubmit={handleSubmit} className="add-fee-form">
        {/* Full Name Input */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Number Input */}
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="\d{10}" // Validation for 10-digit phone number
            title="Enter a valid 10-digit phone number"
          />
        </div>

        {/* Course Selection */}
        <div className="form-group">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            disabled={!!location.state?.courseId} // Disable if pre-selected
            required
          >
            <option value="">Select Course</option>
            {courseList.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        {/* Remark Input */}
        <div className="form-group">
          <label htmlFor="remark">Remark</label>
          <textarea
            id="remark"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Payment"}
        </button>
      </form>
    </div>
  );
};

export default CollectFee;
