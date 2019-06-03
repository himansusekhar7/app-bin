import React, { Component } from 'react';

class AppQuickNote extends Component {

  _displayQuickNotesColumn = () => {
    return(
      <div className="col-4 quick-notes_list">
        <ul>
          <li>Quick 1</li>
          <li>Quick 3</li>
          <li>Quick 2</li>
        </ul>
      </div>
    );
  };

  _displayQuickNotesPanel = () => {
    return(
      <div className="col-8 quick-notes_details_panel">
        <h1>Quick notes Date</h1>
        <p>Quick notes content here</p>
      </div>
    );
  };

  render() {
    return (
      <div className="quick-notes-wrapper">
        {this._displayQuickNotesColumn()}
        {this._displayQuickNotesPanel()}
      </div>
    );
  }
}

export default AppQuickNote;