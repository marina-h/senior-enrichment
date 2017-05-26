import React from 'react';
import { Link } from 'react-router';

const SingleCampus = ({ currentCampus, students }) => {
  return (
    <div>
      <h1>{ currentCampus.name } Campus</h1>
      <ol>
        {students.map((student, idx) => (
          <div key={ student.id }>
            <Link to={`/student/${ student.id }`} value={ student.name }>{idx + 1} - { student.name }</Link>
          </div>
        ))}
      </ol>
    </div>
  )
}

export default SingleCampus;
