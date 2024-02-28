import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Loading from './components/Loading.jsx'
import {Provider} from "react-redux"
import {store,persistor} from "./redux/store.js"
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Suspense fallback={<Loading/>}>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </Suspense>
  </React.StrictMode>
)
