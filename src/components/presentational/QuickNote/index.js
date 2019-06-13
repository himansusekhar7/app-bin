import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style';

class QuickNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: true,
      unsavedContent: false,
      currentNoteId: 0,

    };
  }

  componentDidMount(){
    const { notes } = this.props;
    if (notes && notes.length) {
      const currentNoteId = notes[0].id;
      this.setState({ currentNoteId });
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
    return this._filterNoteData(noteId);
  }

  _filterNoteData = (noteId = 0) => {
    const { notes } = this.props;
    const { currentNoteId } = this.state;
    const filteredNote = noteId > 0 ? notes && notes.filter( note => note.id === noteId ) : currentNote;
    return filteredNote && {
      noteContent: filteredNote && filteredNote.content || '',
      title: filteredNote && filteredNote.content && filteredNote.content.substring(0, 20)
    }
  };

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
    const { noteContent, title } = this._filterNoteData();

    return(
      <div className="col-8 quick-notes_details_panel">
        <h1>{title}</h1>
        <p style={{display: paraInlineStyle}}>
          { noteContent && <pre dangerouslySetInnerHTML={{__html: noteContent}}/> }
        </p>
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