import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles.ts'
import { AlertContextProvider } from './contexts/AlertContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <AlertContextProvider>
      <App />
    </AlertContextProvider>
  </React.StrictMode>,
)
