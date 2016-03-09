import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import App from './components/App';

const store = configureStore();

render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('app')
);
