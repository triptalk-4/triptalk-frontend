import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
// import { worker } from './mocks/setup.ts';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// worker.start();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={'57409677042-8qrpnbbfcq8d6jeq9kmvh8357vi4p4up.apps.googleusercontent.com'}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
