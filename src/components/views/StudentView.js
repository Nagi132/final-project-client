import { Link } from 'react-router-dom';
/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;
  if (!student) {
    return <p>Loading student data...</p>;
  }

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname} {student.lastname}</h1>
      <img src={student.imageUrl} alt={`${student.firstname} ${student.lastname}`} style={{ width: '200px', height: '200px' }} />
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa ? student.gpa : "N/A"}</p>

      <h3>Campus</h3>
      {student.campus ? (
        <Link to={`/campus/${student.campusId}`}>
          <h2>{student.campus.name}</h2>
        </Link>)
        : (
          <p>This student is not enrolled in any campus.</p>
        )}
    </div>
  );
};

export default StudentView;