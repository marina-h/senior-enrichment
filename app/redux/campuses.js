import axios from 'axios';

const RECEIVE_CAMPUSES = 'GET_CAMPUSES';
const RECEIVE_CAMPUS = 'GET_CAMPUS';
const RECEIVE_CAMPUS_STUDENTS = 'RECEIVE_CAMPUS_STUDENTS';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';



const receiveCampuses = campuses => ({
  type: RECEIVE_CAMPUSES,
  campuses
});

const receiveCampus = campus => ({
  type: RECEIVE_CAMPUS,
  campus
});

const receiveCampusStudents = students => ({
  type: RECEIVE_CAMPUS_STUDENTS,
  students
})

const createCampus = campus => ({
  type: CREATE_CAMPUS,
  campus
});

const updateCampus = campus => ({
  type: UPDATE_CAMPUS,
  campus
});

const deleteCampus = campus => ({
  type: DELETE_CAMPUS,
  campus
});

const initialState = {
  campuses: [],
  currentCampus: {},
  campusStudents: []
};

// CHANGE campuses to campusList

export default function reducer (state = initialState, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CAMPUSES:
      newState.campuses = action.campuses;
      break;

    case RECEIVE_CAMPUS:
      newState.currentCampus = action.campus;
      break;

    case RECEIVE_CAMPUS_STUDENTS:
      newState.campusStudents = action.students;
      break;

    case CREATE_CAMPUS:
      newState.campuses = [...newState.campuses, action.campus];
      break;

    case UPDATE_CAMPUS:
      newState.campuses = newState.campuses.map(campus => {
        return campus.id === action.campus.id ? action.campus : campus;
      });
      break;

    case DELETE_CAMPUS:
      newState.campuses = newState.campuses.filter(campus => {
        return campus.id !== action.campus.id;
      });
      break;

    default:
      return state
  }

  return newState;
}



export const getCampuses = () => dispatch => {
  axios.get('/api/campus')
  .then(res => res.data)
  .then(campuses => {
    dispatch(receiveCampuses(campuses));
  })
  .catch(err => console.error('Could not get list of campuses.'));
}

export const getCampus = (campusId) => dispatch => {
  axios.get(`/api/campus/${campusId}`)
  .then(res => res.data)
  .then(campus => {
    dispatch(receiveCampus(campus));
  })
  .catch(err => console.error('Could not get campus.'));
}

export const getCampusStudents = (campusId) => dispatch => {
  axios.get(`/api/campus/${campusId}/students`)
  .then(res => res.data)
  .then(students => {
    dispatch(receiveCampusStudents(students));
  })
  .catch(err => console.error('Could not get students on campus.'));
}

