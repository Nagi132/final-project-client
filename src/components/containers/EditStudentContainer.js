/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            campusId: null,
            email: "",
            imageUrl: "",
            gpa: 0.0,
            campusId: "",
            redirect: false,
            redirectId: null
        };
    }

    // Capture input data when it is entered
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Take action after user click the submit button
    handleSubmit = async (event, prev) => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.

        let student = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            campusId: this.state.campusId,
            email: this.state.email,
            imageUrl: this.state.imageUrl,
            gpa: this.state.gpa,
            id: this.props.match.params.id
        };

        if (student.firstname === "") {
            student.firstname = prev.firstname;
        }

        if (student.lastname === "") {
            student.lastname = prev.lastname;
        }

        if (student.campusId === "") {
            student.campusId = prev.campusId;
        }

        if (student.email === "") {
            student.email = prev.email;
        }

        if (student.imageUrl === "") {
            student.imageUrl = prev.imageUrl;
        }

        if (student.gpa === "") {
            student.gpa = prev.gpa;
        }

        // Update state, and trigger redirect to show the edit student
        await this.props.editStudent(student);

        this.setState({
            firstname: "",
            lastname: "",
            campusId: null,
            email: "",
            imageUrl: "",
            gpa: 0.0,
            redirect: true,
            redirectId: student.id
        });
    }

    // Unmount when the component is being removed from the DOM:
    componentWillUnmount() {
        this.setState({ redirect: false, redirectId: null });
    }

    // Render edit student input form
    render() {
        // Redirect to show the edit student after submit
        if (this.state.redirect) {
            return (<Redirect to={`/student/${this.state.redirectId}`} />)
        }

        // Display edit student input form
        return (
            <div>
                <Header />
                <EditStudentView
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    student={this.props.student}
                />
            </div>
        );
    }
}



// The following input argument (mapState) is passed to the "connect" function used by the "EditStudentContainer" component to connect to the Redux Store. 
// The "mapState" argument is used to read values from the Redux Store and pass them as props to the connected component.
// It maps the state of the Redux Store to the props of the component, allowing the component to access the required data from the Store. 
// When the Redux Store's state changes, the connected component will receive the updated props.
const mapState = (state) => {
    return ({
        student: state.student
    })
}

// The following input argument is passed to the "connect" function used by "EditwStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return ({
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);