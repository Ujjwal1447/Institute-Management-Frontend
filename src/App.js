import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Page/Home';
import Courses from './Page/Courses';
import AddCourse from './Page/AddCourse';
import Student from './Page/Student';
import AddStudent from './Page/AddStudent';
import CollectFee from './Page/CollectFee';
import PaymentHistory from './Page/PaymentHistory';
import CourseDetail from './Page/CourseDetail';
import StudentDetail from './Page/StudentDetail';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer /> {/* Moved outside of Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} >
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="student" element={<Student />} />
            <Route path="add-student" element={<AddStudent />} />
            <Route path="collect-fee" element={<CollectFee />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="course-detail/:id" element={<CourseDetail />} />
            <Route path='update-course/:id' element={<AddCourse />} />
            <Route path='update-student/:id' element={<AddStudent />} />
            <Route path="student-detail/:id" element={<StudentDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
