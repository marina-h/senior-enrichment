import { connect } from 'react-redux';
import SingleCampus from './SingleCampus';

function mapStateToProps(state) {
  return {
    currentCampus: state.campuses.currentCampus,
    students: state.campuses.campusStudents
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
