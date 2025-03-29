import React, { useEffect, useState } from "react";
import "./Css/HomePage.css";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [totalCourse, setTotalCourse] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getHomeDetails();
  }, []);

  const getHomeDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4200/course/home", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log("API Response:", response.data); // Debugging

      setTotalCourse(response.data.totalCourse);
      setTotalStudents(response.data.totalStudent);
      setTotalAmount(response.data.totalAmount); // ✅ Fixed this line
      setCourses(response.data.courses);
      setStudents(response.data.students); // ✅ Added this line
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Failed to fetch home data. Please try again.");
    }
  };

  return (
    <div className="home-container">
      {/* Count Boxes */}
      <div className="count-box-container">
        <div className="box">
          <h3>Total Courses</h3>
          <p>{totalCourse}</p>
        </div>
        <div className="box">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div className="box">
          <h3>Total Amount</h3>
          <p>${totalAmount}</p> {/* Displaying as currency */}
        </div>
      </div>

      {/* Latest Courses & Students */}
      <div className="latest-container">
        <h2>Latest Courses</h2>
        {courses.length > 0 ? (
          <ul>
            <table>
              <thead>
                <tr>
                  <th>Courses Name</th>
                  <th>Price</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr>
                    <td>
                      <p>{course.courseName}</p>
                    </td>
                    <td>
                      <p>{course.price}</p>
                    </td>
                    <td>
                      <p>{course.endDate}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        ) : (
          <p>No recent courses found.</p>
        )}

        <h2>Latest Students</h2>
        {students.length > 0 ? (
          <ul>
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Phone</th>
                  <th>Email Id</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr>
                    <td>
                      <p>{student.fullName}</p>
                    </td>
                    <td>
                      <p>{student.phone}</p>
                    </td>
                    <td>
                      <p>{student.email}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        ) : (
          <p>No recent students found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
