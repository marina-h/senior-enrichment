import React from 'react';
import { Link } from 'react-router';

const CampusList = ({ campuses }) => {
  return (
    <div>
      <ul>
        {campuses.map(campus => (
          <div key={ campus.id }>
            <Link to={`/campus/${ campus.id }`} value={ campus.name }>{ campus.name }</Link>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default CampusList;
