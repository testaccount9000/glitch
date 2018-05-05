/*
We use a cache to keep an identity map of categories by id.

When constructing a user model Category(...) if it has an id
field it will be cached based on the id. If the id already
exists in the cache the same reference to that model will be
returned.

If the id property is not given the model is not cached.

*/

let Category;
const cache = {};

import Model from './model';

export default Category = function(I, self) {

  if (I == null) { I = {}; }
  if (self == null) { self = Model(I); }
  if (cache[I.id]) {
    return cache[I.id];
  }
  
  self.defaults(I, {
    avatarUrl: undefined,
    backgroundColor: undefined,
    color: undefined,
    description: undefined,
    name: undefined,
    url: undefined,
    projects: [],
  });
  
  self.asProps = () => ({
    id: self.id(),
    avatarUrl: self.avatarUrl(),
    backgroundColor: self.backgroundColor(),
    color: self.color(),
    description: self.description(),
    name: self.name(),
    url: self.url(),
    projects: self.projects.map(projectModel => projectModel.asProps()),
  });
                        

  self.attrObservable(...Array.from(Object.keys(I) || []));
  
  self.attrModels('projects', Project);
  self.attrObservable("gettingCategory", "fetched");

  if (I.id) {
    cache[I.id] = self;
  }
  // console.log '☎️ category cache', cache

  return self;
};

Category.getRandomCategories = function(api) {
  const categoriesPath = "categories/random";
  return api.get(categoriesPath)
    .then(({data}) =>
      data.map(categoryDatum => Category(categoryDatum).update(categoryDatum))
    );
};

Category.updateCategory = function(application, id) {
  const categoriesPath = `categories/${id}`;
  return application.api().get(categoriesPath)
    .then(function({data}) {
      data.fetched = true;
      Category(data).update(data); // .pushSearchResult(application)
      application.getProjects(data.projects);
      return application.categoryProjectsLoaded(true);
    });
};


Category._cache = cache;

// Circular dependencies must go below module.exports
import Project from './project';
