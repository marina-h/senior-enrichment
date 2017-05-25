import React from 'react';
import { Link } from 'react-router';

const StudentList = ({ students, removeStudent }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Campus</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, idx) => {
          let boundRemoveStudent = removeStudent.bind(null, Number(student.id));
          return (
            <tr key={ student.id }>
              <td>{ idx + 1 }</td>
              <td><Link to={`/student/${ student.id }`} value={ student.name }>{ student.name }</Link></td>
              <td><Link to={`/campus/${ student.campusId }`} value={ student.campusId }>{ student.campusName }</Link></td>
              <td><button name={ student.id } onClick={ boundRemoveStudent }> X </button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default StudentList;
