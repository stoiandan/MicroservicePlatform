import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './state/store';
import LoginPage from './components/login'

import DataPage from './components/dataPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AggregationPage from './components/aggregationPage';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/aggregate" element={<AggregationPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

