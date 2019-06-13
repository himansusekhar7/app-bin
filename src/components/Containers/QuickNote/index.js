import { connect } from 'react-redux'
import QuickNote from '../../presentational/QuickNote';

const mapStateToProps = state => ({
  notes: state.quickNotes
});
const AppQuickNote = connect(mapStateToProps) (QuickNote);

export default AppQuickNote;