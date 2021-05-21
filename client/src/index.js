import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux'
import {appReducer} from './state/reducers/index'
import thunk from 'redux-thunk';

const store = createStore(appReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap app in Provider passing in store as props */}
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById( 'root' )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
