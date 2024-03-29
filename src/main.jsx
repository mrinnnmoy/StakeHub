import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import "./App.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster className="toast" position="bottom-right" />
    <App />
  </React.StrictMode>,
)
