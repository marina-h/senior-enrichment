import { connect } from 'react-redux';
import SingleStudent from './SingleStudent';

function mapStateToProps(state) {
  return {
    currentStudent: state.students.currentStudent
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
