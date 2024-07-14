 import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-toastify/dist/ReactToastify.min.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store.js'
import theme from './theme.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <CssVarsProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </CssVarsProvider>
  </Provider>
)
