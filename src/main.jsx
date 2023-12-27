import React from 'react'
import App from './App.jsx'
import './index.css'
import {render} from 'react-dom';


render(
  (<React.StrictMode>
    <App />
  </React.StrictMode>),
  document.getElementById('root')
)
