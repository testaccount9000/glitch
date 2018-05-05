import FeaturedCollectionTemplate from '../templates/includes/featured-collection';

export default function(application, collection) {
  const self = {
    collection,

    title() {
      return collection.title ;
    },
    
    src() {
      return collection.img;
    },
        
    link() {
      return collection.link || null;
    },
    
    imgTitle() {
      return collection.imgTitle || "";
    },
  };
      
  return FeaturedCollectionTemplate(self);
}
