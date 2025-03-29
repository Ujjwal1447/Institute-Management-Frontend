import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Css/Students.css';
import { toast } from 'react-toastify';
// import Course from '../../../API/model/Course';

const Students = () => {
    const { id } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4200/student/all-students', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStudents(response.data.students);
            } catch (err) {
                console.error('Error fetching students:', err);
                setError('Failed to fetch students. Please try again later.');
                toast.error('Failed to fetch students. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="students-container">
            <h2 className="section-title">Student Details</h2>
            <table className="students-table">
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
                            key={student._id}
                            onClick={() => navigate(`/dashboard/student-detail/${student._id}`)}
                        >
                            <td>
                                <img
                                    src={student.imageUrl}
                                    alt={`${student.fullName}'s pic`}
                                    className="student-image"
                                />
                            </td>
                            <td>{student.fullName}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Students;
