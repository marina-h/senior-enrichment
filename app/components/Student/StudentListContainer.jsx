import { connect } from 'react-redux';

import StudentList from './StudentList';
import { removeStudent } from '../../redux/students';

function mapStateToProps(state) {
  return {
    students: addCampusNames(state.students.students, state.campuses.campuses)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeStudent: function(deleteEvent) {
      dispatch(removeStudent(deleteEvent));
    }
  };
}

function addCampusNames(students, campuses) {
  return students.map(student => {
    student.campusName = campuses.find(campus => {
      return campus.id === student.campusId;
    }).name;
    return student;
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
