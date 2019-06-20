import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style';

class QuickNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      unsavedContent: false,
      currentNote: {}
    };
  }

  componentDidMount(){
    const { notes } = this.props;
    if (notes && notes.length) {
      this._filterNoteData();
    }
  };
  
  _filterNoteData = (noteId = 0) => {
    const { notes } = this.props;
    const { currentNote } = this.state;
    const requestedNoteId = parseInt(noteId, 10);
    const filteredNote = requestedNoteId > 0 ? notes && notes.filter( note => note.id === requestedNoteId )[0] 
                        : (Object.entries(currentNote).length === 0 && currentNote.constructor === Object) 
                        ? notes[0] : currentNote;
    if (filteredNote) {
      const currentFilteredNote = {
        noteContent: filteredNote.content || '',
        title: filteredNote.content && filteredNote.content.substring(0, 20)
      }
      this.setState({ currentNote: currentFilteredNote });
    }
  };

  _displayQuickNotesColumn = () => {
    const { notes } = this.props;
    const noteList = notes.map((note, index) => {
      return (
        <li data-note-id={note.id} key={`${note.id}-note-row`} onClick={this._selectNote}>
          <span>{`#${++index}.`}</span>
          <span>{(note.content).substring(0, 30)}...</span>
        </li>
      )
    })
    return(
      <div className="col-4 quick-notes_list">
        <ul> { noteList } </ul>
      </div>
    );
  };

  _selectNote = (event) => {
    const target = event.target;
    const noteId = target.getAttribute('data-note-id');
    this._filterNoteData(noteId);
  }

  _saveNote = (event) => {
    // this.setState({ paraText, curPos: this._textArea.selectionEnd });
  };

  _closeEditor = (event) => {
    // 
  };

  _handleEditingContent = (event) => {
    this.setState({ unsavedContent: this._textArea.value });
  };

  _calculateTextAreaHeight = () => {
    return `${(window.innerHeight - 153)}px`;
  };

  _displayQuickNotesPanel = () => {
    const { isEditing, unsavedContent } = this.state;
    const paraInlineStyle = isEditing ? 'none' : 'block';
    const editorInlineStyle = !isEditing ? 'none' : 'block';
    const { noteContent, title } = this.state.currentNote;

    return(
      <div className="col-8 quick-notes_details_panel">
        <h1>{title}</h1>
        <div style={{display: paraInlineStyle}}>
          <button className="btn btn-outline-primary btn-sm">
            <span className="material-icons">edit</span>
          </button>
          { noteContent && <p dangerouslySetInnerHTML={{__html: noteContent}}/> }
        </div>
        <form className="note-editor-panel" style={{display: editorInlineStyle}}>
          <div className="form-group">
            <textarea
              style={{height: this._calculateTextAreaHeight()}}
              className="form-control"
              ref={txtArea => this._textArea = txtArea}
              value={unsavedContent || noteContent}
              onChange={this._handleEditingContent}
            />
          </div>
          <div className="form-group">
            <div className="btn-group">
              <button type="button" onClick={this._closeEditor} className="btn btn-default">Cancel</button>
              <button type="button" onClick={this._saveNote} className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
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

QuickNote.proptypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({}))
};

export default QuickNote;