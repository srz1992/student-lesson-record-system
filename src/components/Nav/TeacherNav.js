import React from 'react';
import { Link } from 'react-router-dom';

const TeacherNav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/teacherHome">
            Home
          </Link>
        </li>
        <li>
          <Link to="/teacherBookedLessons">
            Bookings
          </Link>
        </li>
        <li>
          <Link to="/bookingRequests">
            Booking Requests
          </Link>
        </li>
        <li>
          <Link to="/searchStudents">
            Search Students
          </Link>
        </li>

      </ul>
    </div>
  </div>
);

export default TeacherNav;
