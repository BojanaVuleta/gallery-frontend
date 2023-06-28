import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Heading from './components/Heading';
import UserProvider from './storage/UserProvider';
import GalleryProvider from './storage/GalleryProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <GalleryProvider>
    <BrowserRouter>
    <Heading/>
       <App />
    </BrowserRouter>
    </GalleryProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
