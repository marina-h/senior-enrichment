import { combineReducers } from 'redux';

import campuses from './campuses';
import students from './students';

export default combineReducers({ campuses, students });

// const initialState = {}

// const rootReducer = function(state = initialState, action) {
//   switch(action.type) {
//     default: return state
//   }
// };

// export default rootReducer
