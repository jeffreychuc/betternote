import Notes from './notes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { destroyNote } from '../../actions/notes';


const mapStateToProps = (state, ownProps) => {
  console.log(state, 'IN MAP TO PROPS IN NOTES CONTAINER');
  return({
    notes: state.entities.notes,
  });
};

const mapDispatchToProps = (dispatch) => ({
  destroyNote: (id) => dispatch(destroyNote(id))
});

export default withRouter(connect(null, mapDispatchToProps)(Notes));
