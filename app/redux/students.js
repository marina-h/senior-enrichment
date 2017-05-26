import axios from 'axios';

const RECEIVE_STUDENTS = 'GET_STUDENTS';
const RECEIVE_STUDENT = 'GET_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

const receiveStudents = students => ({
  type: RECEIVE_STUDENTS,
  students
});

const receiveStudent = student => ({
  type: RECEIVE_STUDENT,
  student
});

const createStudent = student => ({
  type: CREATE_STUDENT,
  student
});

const updateStudent = student => ({
  type: UPDATE_STUDENT,
  student
});

const deleteStudent = student => ({
  type: DELETE_STUDENT,
  student
});

const initialState = {
  students: [],
  currentStudent: {}
};


export default function reducer (state = initialState, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_STUDENTS:
      newState.students = action.students;
      break;

    case RECEIVE_STUDENT:
      newState.currentStudent = action.student;
      break;

    case CREATE_STUDENT:
      newState.students = [...newState.students, action.student];
      break;

    case UPDATE_STUDENT:
      newState.students = newState.students.map(student => {
        return student.id === action.student.id ? action.student : student;
      });
      break;

    case DELETE_STUDENT:
      newState.students = newState.students.filter(student => {
        return student.id !== action.student.id;
      });
      break;

    default:
      return state
  }

  return newState;
}



export const getStudents = () => dispatch => {
  axios.get('/api/student')
  .then(res => res.data)
  .then(students => {
    dispatch(receiveStudents(students));
  })
  .catch(err => console.error('Could not get list of students.'));
}

export const getStudent = (studentId) => dispatch => {
  axios.get(`/api/student/${studentId}`)
  .then(res => res.data)
  .then(student => {
    dispatch(receiveStudent(student));
  })
  .catch(err => console.error('Could not get student.'));
}

export const addStudent = (student) => dispatch => {
  axios.post(`/api/student`, student)
  .then(res => res.data)
  .then(addedStudent => {
    dispatch(createStudent(addedStudent));
  })
  .catch(err => console.error('Could not add the new student.'));
}

export const removeStudent = (studentId) => dispatch => {
  axios.delete(`/api/student/${studentId}`)
  .then(res => res.data)
  .then(() => {
    dispatch(deleteStudent(studentId));
  })
  .catch(err => console.error('Could not delete student.'));
}
