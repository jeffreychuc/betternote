import React from 'react';
import { Button } from 'react-bootstrap';

class Editor extends React.Component  {
  constructor (props)  {
    super(props);
  }

  handleLogout () {
    this.props.logout().then(() => this.props.history.push('/'));
  }

  render()  {
    return (
      <div>
      <h1>Logged In</h1>
        <Button className='logout' onClick={this.handleLogout.bind(this)} block>Logout</Button>
      </div>
    );
  }
}

export default Editor;