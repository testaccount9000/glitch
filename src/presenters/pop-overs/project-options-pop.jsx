import React from 'react';
import PropTypes from 'prop-types';

const PopOverButton = ({onClick, text, emoji}) => (
  <button className="button-small has-emoji button-tertiary" onClick={onClick}>
    <span>{text} </span>
    <span className={`emoji ${emoji}`}></span>
  </button>
);

export const ProjectOptionsPop = ({
  projectId,
  projectName, projectIsPinned, closeAllPopOvers, 
  togglePinnedState, deleteProject, 
  leaveProject, removeProjectFromTeam
}) => {
  
  function addPin(event) {
    togglePin(event, 'slide-up');
  }
  
  function removePin(event) {
    togglePin(event, 'slide-down');
  }
  
  function togglePin(event, className) {
    const projectContainer = event.target.closest('li');
    closeAllPopOvers();
    $(projectContainer).one('animationend', () => togglePinnedState(projectId));
    return $(projectContainer).addClass(className);
  }
     
  function clickLeave(event) {
    const prompt = `Once you leave this project, you'll lose access to it unless someone else invites you back. \n\n Are sure you want to leave ${projectName}?`;
    if (window.confirm(prompt)) {
      return leaveProject(projectId, event);
    }
  }
  
  function clickDelete(event) {
    return deleteProject(projectId, event);
  }
  
  return (
    <dialog className="pop-over project-options-pop">
      <section className="pop-over-actions">
        { projectIsPinned ? (
          <PopOverButton onClick={removePin} text="Un-Pin This" emoji="pushpin"/>
        ) : (
          <PopOverButton onClick={addPin} text="Pin This" emoji="pushpin"/>
        )}
      </section>


      {removeProjectFromTeam && (
        <section className="pop-over-actions team-options danger-zone last-section">
          <PopOverButton onClick={() => removeProjectFromTeam(projectId)} text="Remove Project" emoji="thumbs_down"/>
        </section>
      )}
      {(deleteProject && leaveProject) && (
        <section className="pop-over-actions danger-zone last-section">
          <PopOverButton onClick={clickDelete} text="Delete This" emoji="bomb"/>
          <PopOverButton onClick={clickLeave} text="Leave This" emoji="wave"/>
        </section>
      )}
    </dialog>
  );
};

ProjectOptionsPop.propTypes = {
  projectId: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectIsPinned: PropTypes.bool.isRequired,
  closeAllPopOvers: PropTypes.func.isRequired,
  togglePinnedState: PropTypes.func,
  deleteProject: PropTypes.func,
  leaveProject: PropTypes.func,
  removeProjectFromTeam: PropTypes.func,
};


export class ProjectOptionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this._ismounted = false;
  }
  
  componentDidMount() { 
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  render() {
    const {projectOptions={}, closeAllPopOvers, project} = this.props;
    
    // If no project options are provided, render nothing.
    if(Object.keys(projectOptions).length === 0) {
      return null;
    }
    
    const showProjectOptionsPop = (event) => {
      const wasVisible = this.state.visible;
      
      closeAllPopOvers();
      event.stopPropagation();
      
      if(wasVisible) {
        // In this circumstance, they clicked the down-arrow in order to
        // close the popup, since it was already open.
        // ..so leave it closed.
        return;
      }
      
      this.setState({visible: true});
      this.props.closeAllPopOvers(() => {
        this._ismounted && this.setState({visible: false});
      });
    };
    
    const popupProps = {
      projectId: project.id,
      projectName: project.name,
      projectIsPinned: project.isPinnedByUser||project.isPinnedByTeam,
      closeAllPopOvers: closeAllPopOvers,
    };
    
    return (
      <React.Fragment>
        <button className="project-options button-borderless opens-pop-over" onClick={showProjectOptionsPop}> 
          <div className="down-arrow"></div>
        </button>
        { this.state.visible && <ProjectOptionsPop {...popupProps} {...projectOptions}></ProjectOptionsPop> }
      </React.Fragment>
    );
  }
}

export default ProjectOptionsContainer;