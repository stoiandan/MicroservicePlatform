import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './state/store';
import LoginPage from './components/login'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LoginPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

