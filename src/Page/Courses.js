import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Css/Courses.css";
import { useNavigate } from "react-router-dom";
const Courses = () => {
  const [courseList, setCourseList] = useState([]); // State to store courses
  const navigate = useNavigate();
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    axios
      .get("http://localhost:4200/course/all-courses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourseList(res.data.courses); // Store fetched courses in state
        // console.log(res.data.courses); // Log fetched courses
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Something went wrong...");
      });
  };

  return (
    <div className="course-wrapper">
      {courseList.map((course) => (
        <div
          onClick={() => {
            navigate("/dashboard/course-detail/" + course._id);
          }}
          className="course-box"
          key={course._id}
        >
          <img src={course.imageUrl} alt="img" className="course-image" />
          <div className="course-content">
            <h3 className="course-title">{course.courseName}</h3>
            <p className="course-price">
              <span className="original-price">Rs.$100</span>
              <span className="offer-price">Rs.${course.price} Only</span>
            </p>
            <p className="course-date">
              Start Date: {new Date(course.startDate).toLocaleDateString()}
            </p>
            <p className="course-date">
              End Date: {new Date(course.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
