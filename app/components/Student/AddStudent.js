import React from 'react';
import { Link } from 'react-router';

const AddStudent = ({ inputName, campuses, selectedCampusId, handleSubmit, handleNameChange, handleCampusChange }) => {
  return (
    <div>
      <label htmlFor="addStudent">Add Student</label>
      <form name="addStudent" onSubmit={ handleSubmit }>
        <div className="row">
          <div className="six columns">
            <input name="name" value={ inputName } required placeholder="Name" onChange={ handleNameChange } />
            <select name="campus" value={ selectedCampusId } onChange={ handleCampusChange }>
              {campuses.map(campus => {
                return (
                  <option key={ campus.id } value={ campus.id }>{ campus.name }</option>
                );
              })}
            </select>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddStudent;
