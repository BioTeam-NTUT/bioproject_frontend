import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery';
import 'virtual:windi.css';
import './index.css';

import { RouterPage } from './pages/RouterPage';

ReactDOM.render(
  <React.StrictMode>
    <div className="bg-gradient-root">
      <RouterPage />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
