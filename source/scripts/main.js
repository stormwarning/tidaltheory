'use strict';

function findParentNodeByClass(parentClass, childObj) {

  var testObj = childObj.parentNode;

  while ( ! testObj.classList.contains(parentClass) ) {

    testObj = testObj.parentNode;

  }

  testObj.classList.toggle('is-visible');

}


function updateParentOnHover() {

  var targetLink = document.getElementsByClassName('js-parent-hover');

  Array.prototype.forEach.call(targetLink, function(el, i) {

    el.addEventListener('mouseover', function() {

      findParentNodeByClass('project-nav', this);

    });

    el.addEventListener('mouseout', function() {

      findParentNodeByClass('project-nav', this);

    });

  });

}


function ready(fn) {

  if ( document.readyState !== 'loading' ) {

    fn();

  } else {

    document.addEventListener('DOMContentLoaded', fn);

  }

}

ready(updateParentOnHover);
