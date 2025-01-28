import _ from 'lodash';
import './main.js';

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack','kuntul','wew'], ' ');
  
    return element;
  }
  if (module.hot) {
    module.hot.accept(); // Aktifkan HMR
  }
  
  document.body.appendChild(component());