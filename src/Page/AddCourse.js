import React, { useEffect, useState } from "react";
import "./Css/AddCourse.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null); // For preview
  const [imageUrl, setImageUrl] = useState(null); // For form submission
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state?.course) {
      const { courseName, description, price, endDate, startDate, imageUrl } =
        location.state.course;
      setCourseName(courseName);
      setDescription(description);
      setPrice(price);
      setEndDate(endDate);
      setStartDate(startDate);
      setImageUrl(imageUrl);
    } else {
      resetForm();
    }
  }, [location.state]);

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      setImageUrl(file); // Store file for form submission
      setImage(URL.createObjectURL(file)); // Preview image
    }
  };

  const resetForm = () => {
    setCourseName("");
    setDescription("");
    setPrice("");
    setStartDate("");
    setEndDate("");
    setImage(null);
    setImageUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !courseName ||
      !description ||
      !price ||
      !startDate ||
      !endDate ||
      !imageUrl
    ) {
      toast.error("Please fill out all fields and upload an image");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("courseName", courseName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);

      if (imageUrl instanceof File) {
        formData.append("image", imageUrl);
      }

      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      };

      if (location.state) {
        await axios.put(
          `http://localhost:4200/course/${location.state.course._id}`,
          formData,
          { headers }
        );
        toast.success("Course has been updated successfully!");
        navigate(`/dashboard/course-detail/${location.state.course._id}`);
      } else {
        await axios.post("http://localhost:4200/course/add-course", formData, {
          headers,
        });
        toast.success("New course has been added successfully!");
        navigate("/dashboard/courses");
      }
      resetForm();
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-course-form">
        <h1>{location.state ? "Edit Your Course" : "Add New Course"}</h1>
        <input
          placeholder="Course Name"
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Price"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Starting Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          placeholder="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={fileHandler}
          required={!location.state}
        />
        {image ? (
          <img className="Institute-logo" src={image} alt="Course Preview" />
        ) : (
          imageUrl &&
          typeof imageUrl === "string" && (
            <img
              className="Institute-logo"
              src={imageUrl}
              alt="Course Preview"
            />
          )
        )}
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
