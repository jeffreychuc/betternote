import { connect } from 'react-redux';
import Home from './home';
import { logout } from '../../actions/session';
import { fetchNotes } from '../../actions/notes';
import { fetchNotebooks } from '../../actions/notebooks';
import { getAllUserTags } from '../../actions/tags';
import { withRouter } from 'react-router-dom';
import { setLoadingState } from '../../actions/ui';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotes()),
  fetchNotebooks: () => dispatch(fetchNotebooks()),
  getAllUserTags: () => dispatch(getAllUserTags()),
  setLoadingState: (loadingState) => dispatch(setLoadingState(loadingState)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
