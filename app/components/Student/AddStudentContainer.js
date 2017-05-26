import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import AddStudent from './AddStudent';
import store from '../../store';
import { addStudent } from '../../redux/students';

class AddStudentContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      selectedCampusId: 1
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      inputName: event.target.value
    });
  }

  handleCampusChange(event) {
    this.setState({
      selectedCampusId: Number(event.target.value)
    });
  }

  handleSubmit(event) {
    let student = {
      name: this.state.inputName,
      email: `${this.state.inputName}@margarethamilton.js`.toLowerCase(),
      campusId: this.state.selectedCampusId
    }
    event.preventDefault();
    store.dispatch(addStudent(student));
    browserHistory.push('/student');
  }

  render() {
    // output error if no name
    return (
      <AddStudent
      inputName={this.state.inputName}
      campuses={this.props.campuses}
      selectedCampusId={this.state.selectedCampusId}
      handleNameChange={this.handleNameChange}
      handleCampusChange={this.handleCampusChange}
      handleSubmit={this.handleSubmit} />
    )
  }

}

function mapStateToProps(state) {
  return {
    campuses: state.campuses.campuses
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudentContainer);
