import { connect } from 'react-redux';
import { createNewUser, loginDemo } from '../../actions/session';
import Home from './home';

const mapDispatchToProps = (dispatch) => ({
  createNewUser: (formUser) => dispatch(createNewUser(formUser)),
  loginDemo: () => dispatch(loginDemo())
});

export default connect(null, mapDispatchToProps)(Home);
