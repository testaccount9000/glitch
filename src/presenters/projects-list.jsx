import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from "./project-item.jsx";

export const ProjectsList = ({closeAllPopOvers, title, isPinned=false, projects, projectOptions}) => {
  const psst = "https://cdn.glitch.com/55f8497b-3334-43ca-851e-6c9780082244%2Fpsst.svg?1500486136908";

  return (
    <article className="projects">
      <h2>
        <span>{title}
          { isPinned && <span className="emoji pushpin emoji-in-title"></span> }
        </span>
      </h2>
      
      { (isPinned && projects.length === 0) && (
        <div className="placeholder">
          <img className="psst" src={psst} alt="psst"></img>
          <p>Pin your projects to show them off
            <span className="emoji pushpin"></span></p>
        </div>
      )}
      
      <ProjectsUL {...{projects, closeAllPopOvers, projectOptions}}></ProjectsUL>
    
    </article>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  isPinned: PropTypes.bool,
};

export const ProjectsUL = ({projects, closeAllPopOvers, projectOptions, categoryColor}) => {
  return (
    <ul className="projects-container">
      { projects.map(project => (
        <ProjectItem key={project.id} {...{closeAllPopOvers, project, projectOptions, categoryColor}}></ProjectItem>
      ))}
    </ul>
  );
};

ProjectsUL.propTypes = {
  projects: PropTypes.array.isRequired,
};


export default ProjectsList;