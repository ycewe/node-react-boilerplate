import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(<App />, document.getElementById('root'));

/**
 * Service worker registration
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

