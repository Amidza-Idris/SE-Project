/*
import { StrictMode } from 'react'
import React from 'react'
import ReactDom from "react-dom/client"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from "@chakra-ui/provider"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
*/
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'

const styles = {
  global: (props) => ({
    body:{
      color:mode('gray.800', 'whiteAlpha.900')(props),
      bg:mode('gray.100', '#101010')(props),
    }
  })
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true
};

const colors = {
  gray:{
    light: "#616161",
    dark: "#1e1e1e"
  }
}

const theme = extendTheme({config, styles, colors})

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme = {theme} >
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)