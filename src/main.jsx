import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { UserProvider } from './store/Auth.jsx'
// import { Provider } from 'react-redux'
// import { store } from './app/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <UserProvider>
  // <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  // </Provider>
  // </UserProvider>,
)
