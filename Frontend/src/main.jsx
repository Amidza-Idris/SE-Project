import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools' // Import mode function
import { BrowserRouter } from 'react-router-dom'

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props),
    },
  }),
}

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
}

const theme = extendTheme({ config, styles, colors })

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)