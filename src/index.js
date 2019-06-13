import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppStore from './store/AppStore';
import App from './App';
console.log(AppStore.getState());
render(
  <Provider store={AppStore}>
    <App/>
  </Provider>,
  document.getElementById('main-article')
);
