import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './Context/AuthContext';
import './App.css';
import Modal from 'react-modal';

import { Rotas } from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement('#root');
root.render(
  <React.StrictMode>
    <AuthProvider>
        <Rotas />
    </AuthProvider>
  </React.StrictMode>
);

