import React from 'react';
const StarterProject = ({title, domain, description, avatar, showOverlay}) => {

  function clickProject(event) {
    event.preventDefault();
    event.stopPropagation();
    showOverlay();
  }
  
  return (
    <li>
      <a href={`/~${domain}`} onClick={clickProject}>
        <div className="project starter-project">
          <div className="project-container">
            <img className="avatar" src={avatar} alt={`Project avatar for ${title}`}/>
            <button>
              <span className="private-project-badge"></span>
              <div className="project-name">{title}</div>
            </button>
            <div className="description">{description}</div>
            <div className="overflow-mask"></div>
          </div>
        </div>
      </a>
    </li>
  );
};
  
const StarterApps = ({starterProjects}) => {
  const bricksUrl = "https://cdn.glitch.com/180b5e22-4649-4c71-9a21-2482eb557c8c%2Fbricks.svg?1521579119559";
  
  return (
    <article className="starter-apps projects">
      <header className="category category-name">
        <h2>Create Your Dream App</h2>
      </header>
      <img className="starter-apps-graphic" alt="" src={bricksUrl} width="129px" height="80px"/>
      <ul className="projects-container">
        { starterProjects.map((starter, key) => (
          <StarterProject key={key} {...starter}/>
        ))}
      </ul>
    </article>
  );
};

export default StarterApps;
