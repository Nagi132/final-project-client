/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus } = props;
  if (!campus) {
    return <p>Loading campus data...</p>;
  }

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt={campus.name} style={{ width: '500px', height: '300px' }} />
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      <h2>Students</h2>
      {campus.students && campus.students.length > 0 ? (
        campus.students.map(student => (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h3>{student.firstname} {student.lastname}</h3>
            </Link>
          </div>
        ))
      ) : (
        <p>No students are enrolled at this campus.</p>
      )}
    </div>
  );
};

export default CampusView;