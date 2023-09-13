import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TweetContextProvider } from './contexts/TweetContext';
import { AuthContextProvider } from './contexts/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <TweetContextProvider>
    <App />
    </TweetContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


