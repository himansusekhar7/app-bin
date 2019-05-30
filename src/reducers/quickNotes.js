const quickNotes = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_NOTE':
      return state.concat([action.text]);
    default:
      return state;
  }
};

export default quickNotes;