import React, { Component } from 'react';

import './style';

class AppQuickNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paraText: '',
      firstFocus: false,
      curPos: 0
    };
  }

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

  _startNote = (event) => {
    let paraText = this._textArea.value;
    if (this.state.firstFocus && this.state.currentText === 'Start here') {
      paraText = '';
    }
    this.setState({ paraText, curPos: this._textArea.selectionEnd });
  };

  _prepareToWrite = (event) => {
    const el = event.target;
    let cursor;
    try{
      cursor = window.getSelection().focusOffset;
    } catch(Exc) {}
    this._textArea.selectionStart = cursor;
    this._textArea.selectionEnd = cursor;
    this.setState({ curPos: cursor });
    this._textArea.focus();
  };

  _displayQuickNotesPanel = () => {
    const { curPos, paraText } = this.state;
    let text = '<span class="text-blinker"></span><span class="text-blinker-pretext show-ruler">Start here</span>';
    if (paraText.length) {
      const preT = paraText.substring(0, curPos);
      const postT = paraText.substring(curPos);
      const preText = preT.split(/\n/g).map(pt => `<span class="show-ruler">${pt}</span>`).join('');
      const postText = postT.split(/\n/g).map(pt => `<span class="show-ruler">${pt}</span>`).join('');
      text = `${preText}<span class="text-blinker"></span>${postText}`;
    }
    // paraText.substring(0, curPos)
    // const text = paraText.length > 0 ? '<span class="show-ruler">' + 
    //             paraText.substring(0, curPos).match(/\n/g)
    //             + '</span>' 
    //             + '<span class="text-blinker"></span>'
    //             + '<span class="show-ruler">' + paraText.substring(curPos) + '</span>'; 
    return(
      <div className="col-8 quick-notes_details_panel">
        <h1>Lorem Ipsum..</h1>
        <p
          onClick={this._prepareToWrite}
          onLoad={this._addLoadEvnt}
        >
          <pre
           dangerouslySetInnerHTML={{__html: text}}
          />
        </p>
        <textarea
          ref={txtArea => this._textArea = txtArea}
          onKeyUp={this._startNote}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="quick-notes-wrapper row">
        {this._displayQuickNotesColumn()}
        {this._displayQuickNotesPanel()}
      </div>
    );
  }
}

export default AppQuickNote;