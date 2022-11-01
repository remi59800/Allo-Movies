import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer
      position={toast.POSITION.BOTTOM_CENTER}
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      progress={undefined}
    />
    <App />
  </>
);
