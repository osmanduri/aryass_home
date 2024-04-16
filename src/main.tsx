import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './Styles/index.scss'
import './tailwind.css'
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </>,
)
