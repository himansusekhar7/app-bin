import { combineReducers } from 'redux';
import quickNotes from './quickNotes';

const initialState = {
  quick_notes:[]
};

export default combineReducers({
  quickNotes
});
