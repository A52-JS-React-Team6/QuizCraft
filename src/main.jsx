import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';


export const colors = {
  brand: {
    orange: '#EC8F5E',
    whiteOrange: '#F3B664',
    yellow: '#F1EB90', 
  },
}

const theme = extendTheme({ colors,
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'blue.200',
        color: 'white',
      }
    },
  } });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)

 