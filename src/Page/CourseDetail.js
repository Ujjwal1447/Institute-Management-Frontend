import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Css/CourseDetail.css";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourseDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4200/course/course-detail/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setCourse(response.data.course);
        setStudents(response.data.students);
      } catch (err) {
        console.error("Error:", err);
        setError("Something went wrong...");
        toast.error("Something went wrong...");
      } finally {
        setLoading(false);
      }
    };

    getCourseDetail();
  }, [id]);

  const deleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:4200/course/${courseId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        toast.success("Course deleted successfully!");
        navigate("/dashboard/courses"); // Redirect to course list after deletion
      } catch (err) {
        console.error("Error:", err);
        toast.error("Failed to delete the course. Please try again.");
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="course-container">
      <h1>Course Details</h1>
      {course && (
        <div className="course-details">
          <div className="course-image-container">
            <img
              src={course.imageUrl}
              alt={course.courseName}
              className="course-image"
            />
          </div>
          <div className="about-course">
            <h2>{course.courseName}</h2>
            <p>Price: {course.price}</p>
            <p>Start Date: {new Date(course.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(course.endDate).toLocaleDateString()}</p>
          </div>
          <div className="course-description-details">
            <div className="course-edit-btn">
              <button
                onClick={() => navigate(`/dashboard/update-course/${course._id}`, { state: { course } })}
                className="Edit"
              >
                Edit
              </button>
              <button
                className="Delete"
                onClick={() => deleteCourse(course._id)}
              >
                Delete
              </button>
            </div>
            <h3>Course Description</h3>
            <div className="description-container">
              {course.description ? (
                <p>{course.description}</p>
              ) : (
                <p className="no-description">No description available for this course.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {students.length > 0 && (
        <div className="students-container">
          <table>
            <thead>
              <tr>
                <th>Student's Pic</th>
                <th>Student Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  onClick={() => navigate(`/dashboard/student-detail/${student._id}`)}
                  key={student._id}
                >
                  <td>
                    <img src={student.imageUrl} alt="student pic" className="student-image" />
                  </td>
                  <td><p>{student.fullName}</p></td>
                  <td><p>{student.phone}</p></td>
                  <td><p>{student.email}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
