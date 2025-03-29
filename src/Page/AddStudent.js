import React, { useEffect, useState } from 'react';
import './Css/AddStudent.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [fullName, setfullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [courseId, setCourseId] = useState('');
    const [image, setImage] = useState(null); // For preview
    const [imageUrl, setImageUrl] = useState(null); // For form submission
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [courseList, setCourseList] = useState([]);
    const location = useLocation();

    useEffect(() => {
        getCourses();

        if (location.state?.student) {
            const { fullName, phone, email, address, courseId, imageUrl } = location.state.student;
            setfullName(fullName);
            setPhone(phone);
            setEmail(email);
            setAddress(address);
            setCourseId(courseId);
            setImageUrl(imageUrl); // Display existing image for editing
        } else {
            resetForm();
        }
    }, [location]);

    const getCourses = () => {
        axios.get('http://localhost:4200/course/all-courses', {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        })
            .then((res) => setCourseList(res.data.courses))
            .catch((err) => {
                console.error('Error:', err);
                toast.error('Something went wrong while fetching courses.');
            });
    };

    const fileHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('File size should be less than 2MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload a valid image file');
                return;
            }
            setImage(URL.createObjectURL(file)); // Preview new image
            setImageUrl(file); // Store new image for submission
        }
    };

    const resetForm = () => {
        setfullName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setCourseId('');
        setImage(null);
        setImageUrl(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!fullName || !phone || !email || !address || !imageUrl) {
            toast.error('Please fill out all fields and upload an image.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('courseId', courseId);
        if (image) {
            formData.append('image', imageUrl);
        }



        if (location.state) {
            axios.put('http://localhost:4200/student/' + location.state.student._id, formData, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            })
                .then(() => {
                    setLoading(false);
                    toast.success('Student details updated successfully!');
                    resetForm();
                    navigate('/dashboard/student-detail/' + location.state.student._id);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Error:', error);
                    toast.error('Something went wrong. Please try again.');
                });
        }
        else {
            axios.post('http://localhost:4200/student/add-student', formData, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            })
                .then(() => {
                    setLoading(false);
                    toast.success('Student details submitted successfully!');
                    resetForm();
                    navigate('/dashboard/courses');
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Error:', error);
                    toast.error('Something went wrong. Please try again.');
                });
        }


    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="add-student">
                <h1>{location.state ? 'Edit Student Details' : 'Add New Student'}</h1>
                <input
                    value={fullName}
                    onChange={(e) => setfullName(e.target.value)}
                    placeholder="Student Name"
                    type="text"
                />
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    type="text"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email ID"
                    type="text"
                />
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full Address"
                    type="text"
                />
                <select disabled={!!location.state} value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                    <option value="">Select Course</option>
                    {courseList.map((course) => (
                        <option key={course._id} value={course._id}>
                            {course.courseName}
                        </option>
                    ))}
                </select>
                <input required={!location.state} type="file" accept="image/*" onChange={fileHandler} />
                {image ? (
                    <img className="student-logo" src={image} alt="Student Preview" />
                ) : (
                    imageUrl && <img className="student-logo" src={imageUrl} alt="Existing Student" />
                )}
                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AddStudent;
