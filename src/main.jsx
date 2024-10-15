import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GetProviderStore } from "./store/routerStore.jsx";
import "./styles/main.scss"
import "./styles/components/secondaryBtn.scss"
// test déploiment
ReactDOM.createRoot(document.getElementById('roothtml')).render(
  <React.StrictMode>
    <GetProviderStore>
      <App />
    </GetProviderStore>
  </React.StrictMode>,
)
