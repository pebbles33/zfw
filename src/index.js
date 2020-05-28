import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//按需加载 不需要引入全局css
// import 'antd-mobile/dist/antd-mobile.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
