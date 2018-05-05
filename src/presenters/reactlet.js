// This shim helps attach React components to Jadelet files
// Also see templates/reactlet.jade

/* globals Set */

import ReactletTemplate from '../templates/reactlet';

import {render} from 'react-dom';
import React from 'react';
let anchorId = 1;
let stack = [];
let distinctIds = new Set();
let batchPending = false;

export default function(Component, props, guid=null) {
  const id = guid || `reactlet-${Component.name}-${anchorId++}`;
  
  // Rather than rendering immediately, 
  // collect the invocations into a stack.
  // We have to wait until the DOM element is present before we can act anyway,
  // and then we can render in reverse order so that duplicates get culled
  // and we end up outputing only the most recent version.
  distinctIds.add(id);
  stack.push({
    id: id,
    render: (el) => { 
      render(
        React.createElement(Component, props),
        el
      );
    }
  });
  
  if(!batchPending) {
    batchPending = true;
    setTimeout(() => { 
      while(stack.length) {
        const {id, render} = stack.pop();
        const distinct = distinctIds.delete(id);
        if(!distinct){
          // The same ID was added multiple times.
          // If we proceed now, we'll render an older version.
          // ...So don't.
          continue;
        }
        const el = document.getElementById(id);
        if(!el) {
          // The page rerendered multiple times before
          // we got put into the dom.
          // Jadelet gonna jadelet, it's ok.
          continue;
        }
        render(el);
      }
      batchPending = false;
      
      if(distinctIds.size !== 0) {
        console.error("Unrendered elements detected", distinctIds);
      }
    });
  }

  return ReactletTemplate({id: id});
}
