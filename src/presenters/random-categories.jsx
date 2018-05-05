import React from 'react';
import PropTypes from 'prop-types';

import {ProjectsUL} from "./projects-list.jsx";
import {sampleSize} from 'lodash';

const Category = ({closeAllPopOvers, category}) => {
  const ulProps = {
    closeAllPopOvers,
    projects: category.projects||[],
    categoryColor: category.color,
  };
  return (
    <article className="projects" style={{backgroundColor: category.backgroundColor}}>
      <header className="category">
        <a className="category-name" href={category.url}>
          <h2>{category.name} <span className="arrow">→</span></h2>
        </a>
        <span className="category-image-container">
          <a className="category-image" href={category.url}>
            <img  height="80px" width="120px" src={category.avatarUrl} alt={category.name} />
          </a>
        </span>
        <p className="category-description">{category.description}</p>
      </header>
      <ProjectsUL {...ulProps}/>
    </article>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  
  componentDidMount() {
    this.props.getCategories().then((categoryModels) => {
      let models = categoryModels.filter(model => !!model.projects.length);
      models = sampleSize(models, 3);
      
      const categories = models.map(categoryModel => {
        const category = categoryModel.asProps();
        category.projects = sampleSize(category.projects, 3);
        return category;
      });
      this.setState({categories});
    });
  }
  render() {
    return (
      <React.Fragment>
        { this.state.categories.map((category) => (
          <Category key={category.id} category={category} closeAllPopOvers={this.props.closeAllPopOvers}/>
        ))}
      </React.Fragment>
    );
  }
}

CategoryContainer.propTypes = {
  getCategories: PropTypes.func.isRequired,
  closeAllPopOvers: PropTypes.func.isRequired,
};
