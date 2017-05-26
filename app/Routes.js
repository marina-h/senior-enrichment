import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Root from './components/Root';
import Home from './components/Home';
import CampusListContainer from './components/Campus/CampusListContainer';
import SingleCampusContainer from './components/Campus/SingleCampusContainer';
import StudentListContainer from './components/Student/StudentListContainer';
import SingleStudentContainer from './components/Student/SingleStudentContainer';
import AddStudentContainer from './components/Student/AddStudentContainer';

import { getCampuses, getCampus, getCampusStudents } from './redux/campuses';
import { getStudents, getStudent } from './redux/students';

const Routes = ({ getInitialData, getCurrentCampus, getCurrentStudent }) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={getInitialData}>
      <IndexRoute component={Home} />
      <Route path="campus/:campusId" component={SingleCampusContainer} onEnter={getCurrentCampus} />
      <Route path="campus" component={CampusListContainer} />
      <Route path="student/add" component={AddStudentContainer} />
      <Route path="student/:studentId" component={SingleStudentContainer} onEnter={getCurrentStudent} />
      <Route path="student" component={StudentListContainer} />
      <Route path="*" component={Home} />
    </Route>
  </Router>
);

const mapStateToProps = (store, ownProps) => {
  return {};
}

const mapDispatchToProps = dispatch => ({
  getInitialData: () => {
    dispatch(getCampuses());
    dispatch(getStudents());
  },
  getCurrentCampus: (nextRouterState) => {
    const campusId = nextRouterState.params.campusId;
    dispatch(getCampus(campusId));
    dispatch(getCampusStudents(campusId));
  },
  getCurrentStudent: (nextRouterState) => {
    const studentId = nextRouterState.params.studentId;
    dispatch(getStudent(studentId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
