import React from 'react';

import PropTypes from 'prop-types';
import ProjectOptionsContainer from "./pop-overs/project-options-pop.jsx";
import UsersList from "./users-list.jsx";

export const ProjectItem = ({closeAllPopOvers, project, categoryColor, projectOptions}) => {

  function showProject(event) {
    event.preventDefault();
    event.stopPropagation();
    return project.showOverlay();
  }
  
  return ( 

    <li>
      <UsersList glitchTeam={project.showAsGlitchTeam} users={project.users}/>
      <ProjectOptionsContainer project={project} closeAllPopOvers={closeAllPopOvers} projectOptions={projectOptions}></ProjectOptionsContainer>
    
      <a href={project.link} onClick={showProject}>
        <div className={['project', project.private ? 'private-project' : ''].join(' ')} 
          style={{backgroundColor: categoryColor, borderBottomColor:categoryColor}}
          data-track="project" data-track-label={project.domain}>
          <div className="project-container">
            <img className="avatar" src={project.avatar} alt={`${project.domain} avatar`}/>
            <button className={project.isRecentProject ? "button-cta" : ""}>
              <span className="private-project-badge"></span>
              <div className="project-name">{project.domain}</div>
            </button>
            <div className="description">{project.description}</div>
            <div className="overflow-mask" style={{backgroundColor: categoryColor}}></div>
          </div>
        </div>
      </a>
    </li>
  );
};

ProjectItem.propTypes = {
  closeAllPopOvers: PropTypes.func.isRequired,
  project: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isPinnedByTeam: PropTypes.bool.isRequired,
    isPinnedByUser: PropTypes.bool.isRequired,
    isRecentProject: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    private: PropTypes.bool.isRequired,
    showAsGlitchTeam: PropTypes.bool.isRequired,
    showOverlay: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
  }).isRequired,
  categoryColor: PropTypes.string,
  projectOptions: PropTypes.object,
};


export default ProjectItem;