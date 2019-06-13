import { initialState } from './initState';

let currentNoteId = 0;
const quickNotes = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_NOTE':
      return Object.assign({}, state, {
        quick_notes: [
          ...state.quick_notes,
          {
            id: ++currentNoteId,
            desc: action.text,
            when: {
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString()
            }
          }
        ]
      });
    case 'REMOVE_NOTE':
      return state.quick_notes.filter(note => note.id !== action.id);
    default:
      return state.quick_notes;
  }
};

export default quickNotes;