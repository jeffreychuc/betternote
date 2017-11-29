import React from 'react';
import NotesContainer from '../notes/notes_container';
import NavSidebarContainer from '../nav/nav_sidebar_container';
import EditorContainer from '../editor/editor_container';
import NotebooksContainer from '../notebooks/notebooks_container';

class Home extends React.Component  {
  constructor (props)  {
    super(props);
  }

  componentDidMount() {
    // fetches notes then sets active note to first note in list.
    console.log('home did mount');
    this.props.setLoadingState(true);
    this.props.fetchNotes().then();
    this.props.fetchNotebooks();
    //add logic for rerouting base on path
  }

  debug() {
    debugger;
  }

  getRedirect() {
    const notesList = this.props.state.entities.notes.ordered.updated_at_desc;
    if (notesList.length === 0) {
      return ('/home/notes/');
    }
    else  {
      return (`/home/notes/${notesList[0]}`);
    }
  }

  componentWillReceiveProps(newProps) {
    // debugger;
    if (newProps.state.entities.notes !== null && newProps.state.entities.notebooks !== null) {
      if (('ordered' in newProps.state.entities.notes) && ('ordered' in newProps.state.entities.notebooks)) {
        // debugger;
        console.log('wtf');
        if (this.props.state.ui.loading)  {
          this.props.setLoadingState(false);
        }
        let redirect;
        // Home view

        if (this.props.match.path === '/home/' || this.props.match.path === '/home/notes/' || newProps.match.path === '/home/notes/') {
          //add logic to check for current notebook
          const notesList = newProps.state.entities.notes.ordered.updated_at_desc;
          // debugger;
          if (notesList.length === 0) {
            redirect = '/home/notes/';
          }
          else  {
            redirect = `/home/notes/${notesList[0]}`;
          }
          // if ((redirect !== this.props.match.url) && (redirect !== newProps.match.url)) {
          //   this.props.history.push(redirect);
          // }
          debugger;
          if (newProps.match.url === '/home/notes/' || ((redirect !== this.props.match.url) && (redirect !== newProps.match.url))) {
            this.props.history.push(redirect);
          }
        }
        else if (newProps.match.path === '/home/notebooks/:notebookId') {
          let notebook_id = newProps.match.params.notebookId;
          // debugger;
          let firstNotebookNote = Object.values(this.props.state.entities.notebooks.ordered.created_at_desc.find((notebookPair) => Object.keys(notebookPair)[0] === notebook_id))[0][0];
          this.props.history.push(`/home/notebooks/${notebook_id}/notes/${firstNotebookNote}`);
        }
      }


      //need to handle all loading in here.....
      // debugger;
    }
  }

  render()  {
    // check for loaded data, set in compoenent did mount
    if (!this.props.state.ui.loading)  {
      console.log('notes loaded, rendering home view');
      // this two lines need to be change to accout for switching notebooks
      // let notesToBePassed = this.props.state.entities.notes;
      let notesToBePassed;

      //logic for notesToBePassed

      if (this.props.match.path.includes('/home/notebooks/:notebookId'))  {
        notesToBePassed = Object.values(this.props.state.entities.notes.by_id).filter((note) => note.notebook_id === parseInt(this.props.match.params.notebookId));
        //set current notebook
        // dont render on this pass?
      }
      else if (this.props.match.path === '/home/notes/:noteId')  {
        notesToBePassed = this.props.state.entities.notes.ordered.updated_at_desc.map((id) => this.props.state.entities.notes.by_id[id]); // returns list of objects (notes) that belong to the user
      }
      // }

      // logic for note to be passed to editor
      let noteToBePassedById;
      // debugger;
      if (('noteId' in this.props.match.params) && (this.props.match.params['noteId'] !== 'new') && ('by_id' in this.props.state.entities.notes)) {
        noteToBePassedById = this.props.state.entities.notes.by_id[this.props.match.params['noteId']];
      }
      else  {
        noteToBePassedById = {body: '', id: 'new'};
      }
      // this two lines need to be change to accout for switching notebooks
      let notebooksToBePassed = this.props.state.entities.notebooks;
      // debugger;
      // debugger;
      return (
        <div className = 'main-view'>
          <NavSidebarContainer />
          <div className = 'notes-sidebar'>
            <NotesContainer notes={notesToBePassed} />
          </div>
          <div className = 'editor-main'>
            <EditorContainer note={noteToBePassedById} placeholder={'Drag files here or just start typing...'}/>
          </div>
          <div className = 'notebooks-sidebar'>
            <NotebooksContainer notebooks={notebooksToBePassed} />
          </div>
        </div>
      );
    }
    else  {
      console.log('notes still loading, skipping render');
      return null;
    }
  }
}

export default Home;
