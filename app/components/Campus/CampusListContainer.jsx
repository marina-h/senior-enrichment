import { connect } from 'react-redux';
import CampusList from './CampusList';

function mapStateToProps(state) {
  return {
    campuses: state.campuses.campuses
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);
