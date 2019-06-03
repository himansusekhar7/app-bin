import { ADD_NOTE, REMOVE_NOTE } from './actionTypes';

export default addNote = (text) => {
  return {
    type: ADD_NOTE,
    text
  };
};

export default removeNote = (id) => {
  return {
    type: REMOVE_NOTE,
    id
  }
};
