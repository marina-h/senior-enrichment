import React from 'react';
import { Link } from 'react-router';

const SingleCampus = ({ currentCampus, students }) => {
  return (
    <div>
      <h1>{ currentCampus.name }</h1>
      <ol>
        {students.map(student => (
          <div key={ student.id }>
            <Link to={`/student/${ student.id }`} value={ student.name }>{ student.name }</Link>
          </div>
        ))}
      </ol>
    </div>
  )
}

export default SingleCampus;
