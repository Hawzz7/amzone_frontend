import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import axios from 'axios';
//"" "http://localhost:8000"
axios.defaults.baseURL = "https://amazon-backend-kbd0.onrender.com"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
