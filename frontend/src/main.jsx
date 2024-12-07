import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; 
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'; 
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store, persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
    </Router>
  </React.StrictMode>
);
